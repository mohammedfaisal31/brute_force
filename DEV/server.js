const express = require('express')
const express_s = require('express-session')
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const mysql = require('mysql2')


const app = express()


//slot details variable
const slot_detail = {}
let unique_id = 0
let final_slot = {}

let prescription = {}

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MyNewPass",
    database: "db_medical"
});
con.connect((err) => {
    if (err) throw err
    console.log("Connected to the database")
})
let urlencodedParser = express.urlencoded({ extended: false })

//Static files
app.use(express.static('content'))
app.use('/css', express.static(__dirname + 'content/css'))
app.use('/js', express.static(__dirname + 'content/js'))
app.use('/images', express.static(__dirname + 'content/images'))

//set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register',{error:""})
})

app.post('/register', urlencodedParser, (req, res) => {
    console.log(req.body)
    let sql = "INSERT INTO patients(patient_name,email,phone_no,passcode,cpasscode) VALUES('" + req.body.username + "','" + req.body.email + "','" + req.body.phone + "','" + req.body.password + "','" + req.body.cpassword + "')"
    con.query(sql, (err, result) => {
        if (err) {
           if(err.code == 'ER_DUP_ENTRY')
            res.render('register',{error:"User already registered"});
        }
        //console.log("inserted 1")
    })
    passUserEmail(req.body.email)
    addPatientName(req.body.username)
})

//Routes
app.get('/doctors', (req, res) => {
    let sql = "SELECT * FROM doctors"
    con.query(sql, (err, result) => {
        if (err) throw err
        //console.log(result)
        res.render('doctors', { doctors: result })
    })

})

app.post('/doctors', urlencodedParser, (req, res) => {
    const partial_slot = Object.assign({}, req.body)
    const slot_array = Object.keys(partial_slot)
    console.log(slot_array[0], slot_array[1])
    passDoctorData(slot_array[0], slot_array[1])
    console.log(slot_detail)
    unique_id = generateUniqueID(slot_detail['patient_id'])
    console.log(unique_id)
    let date = new Date()
    let minute = Math.floor(Math.random() * 4)
    let time = date.getHours() + ":" + minute + "0"
    let sql1 = "INSERT INTO slots(unique_id,patient_id,doctor_id,day,slot_time) VALUES(" + unique_id + ",'" + slot_detail['patient_id'] + "'," + slot_detail['doctor_id'] + ",'" + slot_detail['day'] + "','" + time + "')"
    con.query(sql1, (err) => {
        if (err) throw err
        console.log("inserted slot")
    })
    let sql2 = "SELECT doctor_name FROM doctors WHERE id=" + slot_detail['doctor_id'] + ";"
    con.query(sql2, (err, result) => {
        if (err) throw err
        let doc_obj = Object.assign({}, result[0])
        console.log(doc_obj.doctor_name.toString())
        addDoctorName(doc_obj.doctor_name.toString())
       
    })
    final_slot.unique_id = unique_id,
        final_slot.patient_id = slot_detail['patient_id'],
        final_slot.doctor_id = slot_detail['doctor_id'],
        final_slot.day = slot_detail['day'],
        final_slot.time = time
    
    let sql6 = "INSERT INTO meet(punique_id,doc_id) VALUES("+final_slot.unique_id+","+final_slot.doctor_id+");"
    console.log(sql6)
    con.query(sql6, (err) => {
        if (err) console.log(err)
    })
    
    res.redirect('slot')
})

app.get('/slot', (req, res) => {

    res.render('slot', { slot: final_slot })
})

app.get('/login', (req, res) => {
    res.render('login',{error:""})
})

let loadPrescription_obj = {}
app.post('/login', urlencodedParser, (req, res) => {
    let id = req.body.unique_id
    let password = req.body.password
    console.log(password)
    loadPrescription_obj.pid = id
    getDocIDbyPID(id)
    .then((doc_id)=>{
        loadPrescription_obj.doc_id = doc_id
    })
    .catch((err)=> console.log(err))
    validateLogin(id, password).then(function (obj) {
        console.log(obj.patient_pk,obj.flag,obj.patient_unique_id);
        if(obj.flag == 0) 
            return res.redirect('prescription'),setUniqueID(obj.patient_unique_id)
        else 
            return res.render('login',{error:"Unique ID or password is wrong"})
        
    }).then(function (obj) {
        prescription.unique_id = obj.patient_unique_id
        return setPatientDetails(obj.patient_unique_id)
    })
    .then(function (obj) {
        prescription.patient_name = obj.patient_name
        return setDoctorDetails(obj.patient_unique_id)
    }).then(function (obj) {
         prescription.doctor_name = obj.doctor_name
         return setSlotDetails(obj.patient_unique_id)
    }).then(function (obj) {
        prescription.day = obj.day
        return prescription
    }).then(function(obj){
        console.log(prescription)
    }).catch(function (error) {
        console.log(error);
    });
    
})
app.get('/prescription', (req, res) => {
    
    loadPrescription(loadPrescription_obj.pid,loadPrescription_obj.doc_id)
    .then((result)=>{
        console.log(result)
        res.render('prescription',{result,prescription})
    })
    .catch((err)=>{
        console.log(err)
    })

})

let admin_route_obj = {}


app.get('/admin_login', (req, res) => {
    res.render('admin_login',{error:""})
})

app.post('/admin_login', urlencodedParser, (req, res) => {
    let id = req.body.doc_id
    admin_route_obj.doc_id = id
    let password = req.body.password
    console.log(id,password)
    validateDoctor(id,password).then((obj)=>{
        if(obj['valid'])
            res.redirect('doctor_id')
        else 
            return res.render('admin_login',{error:"ID or password is wrong"})
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/doctor_id', (req, res) => {
    res.render('doctor_id',{error:""})
})

app.post('/doctor_id',urlencodedParser,(req,res)=> {
    admin_route_obj.pid = req.body.punique_id;
    validateRelation(admin_route_obj.pid, admin_route_obj.doc_id).then((obj)=>{
        if(obj['valid'])
            res.redirect('doctor_entry')
        else 
            return res.render('doctor_id',{error:"You do not handle this patient or patient does not exist! "})
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/doctor_entry', (req, res) => {
    res.render('doctor_entry')
})

app.post('/doctor_entry', urlencodedParser, (req, res) => {
    addPrescription(req.body).then((msg)=>{
        console.log(msg)
    })
    .then(updateRelation(req.body.patient_name,admin_route_obj))
    .catch((err)=>{
        console.log(err)
    })
})
app.listen(port, () => console.log("listening"))



//helper functions
function passUserEmail(email) {
    slot_detail.patient_id = email

}

function passDoctorData(doctor_id, day) {
    slot_detail.doctor_id = doctor_id
    slot_detail.day = day
}

function generateUniqueID(patient_id) {
    let gen_id = 0; //to return
    for (var i = 0; i < 6; i++)
        gen_id = gen_id * 10 + ((patient_id.charCodeAt(Math.floor(Math.random() * 5))) % 10);
    return gen_id;
}

function addPatientName(name) {
    final_slot.patient_name = name
}

function addDoctorName(doc_name) {
    console.log(doc_name)
    final_slot.doctor_name = doc_name
    console.log(final_slot)
}

function validateLogin(id, password) {
    //prescription.unique_id = id
    return new Promise((resolve, reject) => {
        let sql4 = " (SELECT passcode FROM patients WHERE email=(SELECT patient_id FROM slots WHERE unique_id='"+id+"')) ;"
        //console.log(sql4);
        con.query(sql4, (err, result) => {
            if (err || typeof result == 'undefined') reject({
                sqlerror:err,
                query:sql4
            })
            //console.log(result);
            resolve({
                patient_pk: Object.assign({}, result[0])['passcode'],
                patient_unique_id: id,
                flag: password.localeCompare(Object.assign({}, result[0])['passcode'])
            })
        })
    })
}
function setPatientDetails(id) {
    return new Promise((resolve, reject) => {
        let sql4 = "SELECT patient_name FROM patients WHERE email = (SELECT patient_id FROM slots WHERE unique_id = " + id + ") ;"
        con.query(sql4, (err, result) => {
            if (err) reject({
                sqlerror:err,
                query:sql4
            })
            resolve(
                {
                    patient_unique_id: id,
                    patient_name: Object.assign({}, result[0])['patient_name'],
                    flag: true
                }
            )
        })
    })
}
function setDoctorDetails(id) {
    return new Promise((resolve, reject) => {
        let sql4 = "SELECT doctor_name FROM doctors WHERE id = (SELECT doctor_id FROM slots WHERE unique_id = " + id + ") ;"
        con.query(sql4, (err, result) => {
            if (err) reject({
                sqlerror:err,
                query:sql4
            })
            resolve({
                patient_unique_id: id,
                doctor_name: Object.assign({}, result[0])['doctor_name'],
                flag: true
            }
            )
        })
    })
}
function setSlotDetails(id) {
    return new Promise((resolve, reject) => {
        let sql4 = "SELECT `day` FROM slots WHERE unique_id = " + id + " ;"
        con.query(sql4, (err, result) => {
            if (err) reject({
                sqlerror:err,
                query:sql4
            })
            resolve({
                patient_unique_id: id,
                day: Object.assign({}, result[0])['day'],
                flag: true
            })
        })
    })

}
function setUniqueID(id) {
    return new Promise((resolve) => {
            resolve({
                patient_unique_id: id,
            })
    })
}

function renderFinalDetails(p_id) {
    let sql = "SELECT * FROM prescriptions WHERE id="+p_id+";"
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err ) reject({
                sqlerror:err,
                query:sql
            })
            //console.log(result);
            resolve({
                data_obj: Object.assign({},result[0])
            })
        })
    })
}

function validateDoctor(id, password) {
     return new Promise((resolve, reject) => {
            let sql5 = " SELECT true as valid FROM doctors WHERE id ="+id+" AND passcode = '"+password+"';"  //console.log(sql4);
            con.query(sql5, (err, result) => {
                if (err || typeof result == 'undefined') reject({
                    sqlerror:err,
                    query:sql5
                })
               resolve({
                valid: Object.assign({},result[0])['valid']
            })
            })
        })
}

function validateRelation(pid_val, doctor_id_val) {
    return new Promise((resolve, reject) => {
           let sql7 = " SELECT true as valid FROM meet WHERE punique_id ="+pid_val+" AND doc_id = "+doctor_id_val+";"  
           console.log(sql7);
           con.query(sql7, (err, result) => {
               if (err || typeof result == 'undefined') reject({
                   sqlerror:err,
                   query:sql7
               })
              resolve({
               valid: Object.assign({},result[0])['valid']
           })
           })
       })
}

function addPrescription(obj){
    new_obj = {
        time1 : ( obj.time1 == 'Morning' ? '1-0-0' : ( obj.time1 == 'noon'  ? '0-1-0': (obj.time1 == 'Night' ? '0-0-1'  : '0-0-0' ))),
        time2 : ( obj.time2 == 'Morning' ? '1-0-0' : ( obj.time2 == 'noon'  ? '0-1-0': (obj.time2 == 'Night' ? '0-0-1'  : '0-0-0' ))),
        time3 : ( obj.time3 == 'Morning' ? '1-0-0' : ( obj.time3 == 'noon'  ? '0-1-0': (obj.time3 == 'Night' ? '0-0-1'  : '0-0-0' ))),
        time4 : ( obj.time4 == 'Morning' ? '1-0-0' : ( obj.time4 == 'noon'  ? '0-1-0': (obj.time4 == 'Night' ? '0-0-1'  : '0-0-0' ))),
    }
    return new Promise((resolve, reject) => {
        let sql8 = 
        "INSERT INTO prescription(id, patient_name, age, sex, height, weight, bp, sugar, pulse, spo2, details, medicine1, medicine2, medicine3, medicine4, fee,time1,time2,time3,time4)"+
        " VALUES(null,'"+obj.patient_name+"',"+obj.age+",'"+obj.gender+"',"+obj.height+","+obj.weight+","+obj.bp+","+obj.sugar_level+","+obj.pulse_rate+","+obj.spo2+",'"+obj.prescription+"','"+obj.medicine_1+"','"+obj.medicine_2+"','"+obj.medicine_3+"','"+obj.medicine_4+"',"+obj.fee+",'"+new_obj.time1+"','"+new_obj.time2+"','"+new_obj.time3+"','"+new_obj.time4+"');"
    console.log(sql8)
    con.query(sql8, (err) => {
            if (err) reject({
                sqlerror:err,
                query:sql8
            })
           resolve( msg= "success")
        })
    })


}

function updateRelation(pname,obj){
    let sql9 = "UPDATE meet SET pre_id = (SELECT id FROM prescription WHERE patient_name = '"+pname+"') WHERE punique_id = " +obj.pid+" AND doc_id = "+obj.doc_id+";"
    console.log(sql9)
    con.query(sql9, (err) => {
        if (err) 
            console.log(err)
        console.log("relation updated")
        })
}

function loadPrescription(pid,doc_id){
    let sqlx = "SELECT * FROM prescription WHERE id = (SELECT pre_id FROM meet WHERE punique_id = "+pid+" AND doc_id = "+doc_id+");"
    console.log(sqlx);

    return new Promise((resolve, reject) => {
        let sqlx = "SELECT * FROM prescription WHERE id = (SELECT pre_id FROM meet WHERE punique_id = "+pid+" AND doc_id = "+doc_id+");"
        con.query(sqlx, (err,result) => {
            if (err) reject({
                sqlerror:err,
                query:sqlx
            })
           resolve(Object.assign({},result[0]))
        })
    })

}

function getDocIDbyPID(pid){
    return new Promise((resolve, reject) => {
        let sql10= "SELECT doc_id FROM meet WHERE punique_id = "+pid+";"
         con.query(sql10, (err,result) => {
            if (err) reject({
                sqlerror:err,
                query:sql10
            })
           resolve( doc_id= Object.assign({},result[0])['doc_id'])
        })
    })
}