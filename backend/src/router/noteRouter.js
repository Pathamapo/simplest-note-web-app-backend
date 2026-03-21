const { Router } = require('express');
const router = Router();
const noteController = require('../controllers/noteController');
const wrapAsync = require('../middlewares/errorHandler');

router.use((req, res, next) => {
  const safePath = req.path; 
  console.log(`Request: ${req.method} ${safePath}`);
  next();
});

router.post('/add', wrapAsync(noteController.addOneNote));
router.get('/getall', wrapAsync(noteController.getAllNotes));
router.get('/get/:id', wrapAsync(noteController.getOneNote));
router.put('/update/:id', wrapAsync(noteController.updateOneNote));
router.delete('/delete/:id', wrapAsync(noteController.deleteOneNote));

module.exports = router;