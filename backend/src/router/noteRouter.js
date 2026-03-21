const { Router } = require('express');
const router = Router();
const noteController = require('../controllers/noteController');
const wrapAsync = require('../middlewares/errorHandler');

router.use((req, res, next) => {
  const method = req.method;
  const path = req.path.replace(/[\n\r\t]/g, '_'); // แทน newline, tab ด้วย underscore
  console.log(`Request: ${method} ${path}`);
  next();
});

router.post('/add', wrapAsync(noteController.addOneNote));
router.get('/getall', wrapAsync(noteController.getAllNotes));
router.get('/get/:id', wrapAsync(noteController.getOneNote));
router.put('/update/:id', wrapAsync(noteController.updateOneNote));
router.delete('/delete/:id', wrapAsync(noteController.deleteOneNote));

module.exports = router;