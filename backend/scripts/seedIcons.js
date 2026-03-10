import { db } from "../src/config/firebase.js";
import { generateId } from "../src/utils/idGenerator.js";

const icons = [

/* Security */
"FaShieldAlt",
"FaUserShield",
"FaLock",
"FaUnlock",
"FaFingerprint",
"FaEye",
"FaEyeSlash",

/* Users */
"FaUser",
"FaUserTie",
"FaUsers",
"FaUserCheck",
"FaUserClock",
"FaUserSlash",

/* Buildings */
"FaBuilding",
"FaCity",
"FaMapMarkerAlt",
"FaMapMarkedAlt",
"FaWarehouse",
"FaHome",
"FaIndustry",

/* Surveillance */
"FaVideo",
"FaCamera",
"FaSatelliteDish",
"FaBroadcastTower",

/* Alerts */
"FaBell",
"FaExclamationTriangle",
"FaExclamationCircle",
"FaInfoCircle",
"FaEnvelope",

/* Attendance */
"FaClock",
"FaCalendarAlt",
"FaStopwatch",
"FaHourglassHalf",
"FaHistory",

/* Analytics */
"FaChartBar",
"FaChartLine",
"FaChartPie",
"FaClipboardList",
"FaFileAlt"
];

const seedIcons = async () => {

  for (const icon of icons) {

    const iconId = await generateId("icons", "ICO");

    const iconDoc = {
      iconId,
      iconName: icon.replace("Fa", ""),
      iconLibrary: "react-icons/fa",
      iconComponent: icon,
      createdBy: "EMP00001",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection("icons").doc(iconId).set(iconDoc);

    console.log(`Inserted ${iconId} -> ${icon}`);

  }

  console.log("All icons seeded successfully");

};

seedIcons();