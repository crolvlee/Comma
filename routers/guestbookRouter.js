const express = require('express');
const router = express.Router();
const guestbookController = require('../controllers/guestbookController');

router.use(express.json());

// [GET] 방명록 작성 페이지 반환
router.get('/new/:patientId', guestbookController.new);

// [POST] 방명록 작성 처리
router.post('/register/:patientId', guestbookController.register);

// [GET] 방명록 상세조회 /Guestbook/:GuestbookID
router.get('/:guestbookId', guestbookController.view);

module.exports = router;  
