const bcrypt = require('bcrypt');

// 환자 정보 생성
exports.createPatient = async (user) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            INSERT INTO patient (email, password, nickname, id, age, gender, job) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [
            user.email,
            user.password,
            user.nickname,
            user.id,
            user.age,
            user.gender,
            user.job,
        ]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }
        return result.insertId;
    } catch (error) {
        console.error("UserModel.createUser() 쿼리 실행 중 오류:", error);
        throw error;
    }
};

// 의사 정보 생성
exports.createCounselor = async (user) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            INSERT INTO counselor (email, password, nickname, id, age, gender, specialty, experience) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [
            user.email,
            user.password,
            user.nickname,
            user.id,
            user.age,
            user.gender,
            user.specialty,
            user.experience,
        ]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }
        return result.insertId;
    } catch (error) {
        console.error("UserModel.createUser() 쿼리 실행 중 오류:", error);
        throw error;
    }
};

// 환자 정보 이메일로 가져오기
exports.getPatientByEmail = async (email) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            SELECT *
            FROM patient
            WHERE email = ?`;

        const [result] = await db.query(sql, [email]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("UserModel.createUser() 쿼리 실행 중 오류:", error);
        throw error;
    }
};

// 의사 정보 이메일로 가져오기
exports.getCounselorByEmail = async (email) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            SELECT *
            FROM counselor
            WHERE email = ?`;

        const [result] = await db.query(sql, [email]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("UserModel.createUser() 쿼리 실행 중 오류:", error);
        throw error;
    }
};

// 환자 정보 로그인아이디로 가져오기
exports.getPatientByUserId = async (id) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            SELECT *
            FROM patient
            WHERE id = ?`;
        const [result] = await db.query(sql, [id]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('UserModel.getPatientByUserId 오류:', error);
        throw error;
    }
};

// 의사 정보 로그인아이디로 가져오기
exports.getCounselorByUserId = async (id) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            SELECT *
            FROM counselor
            WHERE id = ?`;
        const [result] = await db.query(sql, [id]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('UserModel.getCounselorByUserId 오류:', error);
        throw error;
    }
};

// 의사 정보 의사아이디로 가져오기
exports.getCounselorByCounselorId = async (counselorId) => {
    try {
        const db = await require('../main').connection();
        let sql = `
            SELECT *
            FROM counselor
            WHERE counselor_id = ?`;

        const [result] = await db.query(sql, [counselorId]);

        if (db && db.end) { db.end().catch(err => { console.error('DB 연결 종료 중 오류:', err); }); }

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('UserModel.getCounselorByCounselorId 오류:', error);
        throw error;
    }
};


// 비밀번호 검증
exports.verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// 환자 로그인
exports.loginPatient = async (email, password) => {
    try {
        const patient = await exports.getPatientByEmail(email);
        if (patient && await exports.verifyPassword(password, patient.password)) {
            return patient;
        }
        return null;
    } catch (error) {
        console.error("Patient login error:", error);
        throw error;
    }
};

// 의사 로그인
exports.loginCounselor = async (email, password) => {
    try {
        const counselor = await exports.getCounselorByEmail(email);
        if (counselor && await exports.verifyPassword(password, counselor.password)) {
            return counselor;
        }
        return null;
    } catch (error) {
        console.error("Counselor login error:", error);
        throw error;
    }
};