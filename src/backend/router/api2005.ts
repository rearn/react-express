import { Router } from 'express';

const router = Router();

router.use('/', (req, res) => {
  return res.json([
    { L: 10, H: 1 },
    { L: 10, H: 0 },
    { H: 1, L: 10 },
    { H: 2, L: 3 },
  ]);
});

export = router;
