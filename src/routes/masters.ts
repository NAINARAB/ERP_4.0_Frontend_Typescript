import { MenuGroupPage } from "../layout/subMenu";
import type { componentRoute } from "./indexRouter";
import PackList from "../modules/masters/productAndInventory/packs/list";
import ProductList from "../modules/masters/productAndInventory/products/list";

export const mastersRoutePath: componentRoute[] = [
    { path: '', component: MenuGroupPage },
    { path: 'inventory/packs', component: PackList },
    { path: 'inventory/products', component: ProductList },
];