import path from 'node:path';
import multer from 'multer';
import { Router } from "express";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategory } from "./app/useCases/categories/createCategory";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProductsByCategory } from './app/useCases/categories/listProdutsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback){
      callback(null, `${file.originalname}-${Date.now()}`);
    },
  })
});

router.get('/categories', listCategories);
router.post('/categories', createCategory);
router.get('/products', listProducts);
router.post('/products', upload.single('image'), createProduct);
router.get('/categories/:categoryId/products', listProductsByCategory);
router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.patch('/orders/:orderId', changeOrderStatus);
router.delete('/orders/:orderId', cancelOrder);
