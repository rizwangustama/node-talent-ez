import express from "express";
import Controller from "./controller";

const router = express.Router()
const controller = new Controller()

router.get("", controller.index)
router.get("/:id", controller.show)
router.post("", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

export default router