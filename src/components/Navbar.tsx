"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaCertificate,
  FaClipboardCheck,
  FaWrench,
  FaHistory,
  FaClipboardList,
  FaCalendarCheck,
  FaCalendarAlt,
  FaWarehouse,
  FaBox,
  FaTools,
  FaCheckSquare,
  FaCog,
  FaUsers,
  FaUserTie,
  FaToolbox,
  FaTimes,
  FaBars,
  FaSun,
  FaMoon,
  FaLightbulb,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "@/context/ThemeContext";
import { LinkItem, NavbarLinkProps } from "@/types";

const NavbarLink: React.FC<NavbarLinkProps> = ({
  href,
  label,
  Icon,
  pathname,
  onClick,
}) => (
  <li key={href}>
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg transition duration-200 shadow-sm ${
        pathname === href
          ? "bg-green-500 text-white shadow-md dark:bg-green-600"
          : "text-gray-700 dark:text-gray-300 hover:bg-green-400 dark:hover:bg-green-500 hover:text-white"
      }`}
      onClick={onClick}
    >
      <Icon className="text-lg" />
      <span className="font-semibold">{label}</span>
    </Link>
  </li>
);

const Navbar: React.FC = () => {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const navbarRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  const links: LinkItem[] = [
    { href: `/${locale}/`, icon: FaHome, label: t("home") },
    {
      href: `/${locale}/dashboard`,
      icon: FaTachometerAlt,
      label: t("dashboard"),
    },
    {
      href: `/${locale}/map-dashboard`,
      icon: FaTachometerAlt,
      label: t("mapDashboard"),
    },
    // {
    //   href: `/${locale}/PanelDashboard`,
    //   icon: FaTachometerAlt,
    //   label: t('PanelDashboard'),
    // },
    // {
    //   href: `/${locale}/pricing`,
    //   icon: FaCertificate,
    //   label: t('pricing'),
    // },
  ];

  const maintenanceLinks: LinkItem[] = [
    {
      href: `/${locale}/request-mt`,
      icon: FaClipboardList,
      label: t("requestRepair"),
    },
    // {
    //   href: `/${locale}/report-mt`,
    //   icon: FaWrench,
    //   label: t('repairAssignment'),
    // },
    { href: `/${locale}/repair-task`, icon: FaTools, label: t("myRepairJob") },
    {
      href: `/${locale}/evaluation-mt`,
      icon: FaClipboardCheck,
      label: t("trackingEvaluate"),
    },
    {
      href: `/${locale}/mt-history`,
      icon: FaHistory,
      label: t("repairHistory"),
    },
  ];

  const pmLinks: LinkItem[] = [
    {
      href: `/${locale}/pm-check-sheet`,
      icon: FaClipboardList,
      label: t("checkSheetCreate"),
    },
    {
      href: `/${locale}/holiday-calendar`,
      icon: FaCalendarAlt,
      label: t("holidayCalendar"),
    },
    {
      href: `/${locale}/schedule`,
      icon: FaCalendarCheck,
      label: t("schedule"),
    },
    { href: `/${locale}/calendar`, icon: FaCalendarAlt, label: t("calendar") },
    { href: `/${locale}/pm-history`, icon: FaHistory, label: t("history") },
  ];

  const sparePartsLinks: LinkItem[] = [
    {
      href: `/${locale}/spare-part-inventory`,
      icon: FaWarehouse,
      label: t("sparePartInventory"),
    },
    {
      href: `/${locale}/receive-spare-part`,
      icon: FaBox,
      label: t("receiveSparePart"),
    },
    {
      href: `/${locale}/return-broken`,
      icon: FaTools,
      label: t("returnBrokenSpare"),
    },
    {
      href: `/${locale}/spare-received`,
      icon: FaClipboardCheck,
      label: t("sparePartReceived"),
    },
    {
      href: `/${locale}/part-history`,
      icon: FaHistory,
      label: t("sparePartHistory"),
    },
    {
      href: `/${locale}/approve-part`,
      icon: FaCheckSquare,
      label: t("approval"),
    },
  ];

  const assetsLinks: LinkItem[] = [
    {
      href: `/${locale}/machinery`,
      icon: FaCog,
      label: t("deviceMachineList"),
    },
    {
      href: `/${locale}/borrow-return`,
      icon: FaToolbox,
      label: t("borrowReturnTool"),
    },
  ];

  const othersLinks: LinkItem[] = [
    { href: `/${locale}/user-list`, icon: FaUsers, label: t("userManagement") },
    {
      href: `/${locale}/customer-list`,
      icon: FaUserTie,
      label: t("customerManagement"),

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  return (
    <div>
      {/* ปุ่ม Toggle สำหรับมือถือ */}
      <div className="md:hidden fixed top-0 z-10 w-full bg-green-500 dark:bg-green-700 text-gray-100 px-4 py-4 shadow-md flex justify-end items-center">
        <button
          onClick={toggleNavbar}
          className="text-gray-100 dark:text-gray-200 hover:text-white dark:hover:text-green-100 transition duration-300"
          aria-label="Toggle Navigation"
        >
          {isNavbarOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Navbar สำหรับทั้งมือถือและเดสก์ท็อป */}
      <div
        ref={navbarRef}
        className={`fixed top-0 left-0 h-screen w-72 bg-green-200 dark:bg-green-800 text-gray-800 dark:text-gray-100 px-4 pt-6 transform transition-transform duration-500 ease-in-out z-40 overflow-auto shadow-lg rounded-tr-lg rounded-br-lg ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
      >
        <div className="flex justify-center p-4">
          <Image
            src={isDarkMode ? "/limbic-white-logo.webp" : "/limbic-logo.webp"}
            width={200}
            height={200}
            alt="Logo"
          />
        </div>

        <div className="flex mb-6 space-x-2">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        {/* ลิงก์เพิ่มเติม */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-6">
            {/* ลิงก์ทั่วไป */}
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t("general")}
              </span>
              <ul className="mt-2 space-y-2">
                {links.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li>

            {/* ลิงก์งานซ่อมบำรุง
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t("repairSystem")}
              </span>
              <ul className="mt-2 space-y-2">
                {maintenanceLinks.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li> */}

            {/* ลิงก์งาน PM
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t("pmWork")}
              </span>
              <ul className="mt-2 space-y-2">
                {pmLinks.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li> */}

            {/* ลิงก์ระบบอะไหล่
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t("sparePartsSystem")}
              </span>
              <ul className="mt-2 space-y-2">
                {sparePartsLinks.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li> */}

            {/* ลิงก์ทะเบียนทรัพย์สิน
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t('propertyRegistration')}
              </span>
              <ul className="mt-2 space-y-2">
                {assetsLinks.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li> */}

            {/* ลิงก์อื่นๆ
            <li>
              <span className="block bg-green-400 dark:bg-green-600 text-gray-900 dark:text-gray-100 font-bold px-3 py-2 rounded-lg shadow-sm">
                {t("others")}
              </span>
              <ul className="mt-2 space-y-2">
                {othersLinks.map(({ href, icon: Icon, label }) => (
                  <NavbarLink
                    key={href}
                    href={href}
                    label={label}
                    Icon={Icon}
                    pathname={pathname}
                  />
                ))}
              </ul>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
