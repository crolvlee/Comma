const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// 로그인 페이지 렌더링
router.get('/login', authController.loginLoad);

// 로그인 처리
router.post('/login', authController.login);

// 로그아웃 처리
router.get('/logout', authController.logout);

// 회원가입 페이지 렌더링
router.get('/signup', authController.singupLoad);

// 회원가입 처리
router.post('/submit-signup', authController.singup);

// 이메일 중복 확인
router.post('/check-email', authController.checkEmail);

// 이메일 인증 전송
router.post('/send-auth', authController.emailAuth);

// 아이디 중복 확인
router.post('/check-id', authController.checkId);



module.exports = router;