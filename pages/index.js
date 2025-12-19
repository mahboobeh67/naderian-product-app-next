

import styles from "@/styles/Home.module.css";
import Link from "next/link";



export default function Home() {
  return (
    <>
  <div className={styles.homePanel}>
    <div className={styles.home}>

    <h1>پنل مدیریت کالا/ ادمین</h1>
    <h3>طراحی شده توسط محبوبه نادریان</h3>
    <p>دانشجوی بوت کمپ تیر ماه بوتواستارت</p>
    <h4>جهت ورود به پنل کلیک کنید</h4>
    <Link href={"./auth/login"}>ورود به پنل</Link>

    </div>
    
  </div>
    </>
  );
}
