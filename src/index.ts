// init ionic
import "@ionic/core/css/ionic.bundle.css";
import { defineCustomElements as CoreCustomElements } from "@ionic/core/loader"; 
CoreCustomElements(window).then(() => { /* Ionic is loaded! */ })
import './sw';

import './layout/root/root';
import './layout/list/sieb-des-eratosthenes';