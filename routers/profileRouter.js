const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// 환자 프로필 페이지 반환
router.get('/patient/:patientId', profileController.patientProfilePage);

// 상담사 프로필 페이지 반환
router.get('/counselor/:counselorId', profileController.counselorProfilePage);

module.exports = router;