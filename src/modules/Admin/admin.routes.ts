import { Router } from "express";
import { AdminController } from "./admin.controller";
import { USER_ROLE } from "../User/user.constant";
import auth from "../../middlewares/auth";

const router=Router();


router.patch('/change-role/:id',auth(USER_ROLE.admin),AdminController.changeRole)

router.delete('/delete-user/:userId',auth(USER_ROLE.admin),AdminController.deleteUser)

export const AdminRoutes=router;