

{
    
    
    const crypto = require('crypto');
    const { json } = require('body-parser');
    const emplyee = require('../module/decryptInfo');

    //  Hashing of object to create Secrate Key of given Info.................
    function getSHA256Hash(obj) {
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(obj));
        return hash.digest('hex');
    }


    //  Encrypting of Data with the help of Secrate key............
    function encryptData(data,password) {
        const salt = crypto.randomBytes(16);
        const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return { encryptedData: encrypted, iv: iv.toString('hex'), salt: salt.toString('hex'),password };
    }

    // Decrypting of data in to a playload by the help of encrypted code and Secrate Key................
    function decryptData(encryptedData, password, iv, salt) {
        const key = crypto.pbkdf2Sync(password, Buffer.from(salt, 'hex'), 100000, 32, 'sha256');
        const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    // Sending reponce to (index.html) home page.........................
    module.exports.home=async (req,res)=>{
        const obj ={
            name: 'Jack Reacher',
            origin: 'Bengaluru',
            destination: 'Mumbai'
        };
        const Sec_Key = getSHA256Hash(obj);
        obj['Sec_Key']=Sec_Key;
        const encrypt_data = encryptData(JSON.stringify(obj),Sec_Key);
        const decrypt_data =decryptData(encrypt_data.encryptedData,encrypt_data.password,encrypt_data.iv,encrypt_data.salt);
        console.log(decrypt_data.name,obj.name);
        let data = await emplyee.create({
            name:obj.name,
            origin:obj.origin,
            destination:obj.destination
        });
        res.render('home',{
            title:"home Page",
            name:obj.name,
            origin:obj.origin,
            destination:obj.destination
        });
    }



}