// import SettingNav from "@/components/SettingNav";
// import UserInfoNav, { NavListUser } from "@/components/UserInfoNav";
// import { useEffect, useState } from "react";

// import { useAppContext } from "@/content/AppContext";
// import { toast } from "sonner";
// import { useGetAccount } from "@/api/AccountApi";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { X } from "lucide-react";
// import EmployeeInfoRightBar from "@/components/EmployeeInfoRightBar";

// type Props = {
//   children: React.ReactNode;
// };

// const Layout = ({ children }: Props) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const handleIsMenuOpen = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const [prevWidth, setPrevWidth] = useState(window.innerWidth);
//   // control sidebar open
//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;

//       // Control menu visibility based on screen width
//       if (prevWidth >= 768 && screenWidth < 768) {
//         setIsMenuOpen(false); // Hide menu when screen width decreases below 768
//       } else if (prevWidth < 768 && screenWidth >= 768) {
//         setIsMenuOpen(true); // Show menu when screen width increases to 768 or above
//       }

//       // Update prevWidth
//       setPrevWidth(screenWidth);
//     };

//     // Run once on component load
//     handleResize();

//     // Listen for window resize
//     window.addEventListener("resize", handleResize);

//     // Clean up event listener
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [prevWidth]);
//   // useEffect depends on prevWidth

//   const { auth } = useAppContext();
//   const disable =
//     auth?.position !== "CEO" && auth?.position !== "Office Manager";

//   // auth check

//   const [userId, setUserId] = useState(auth?._id);

//   useEffect(() => {
//     if (auth?._id) {
//       setUserId(auth._id);
//     }
//   }, [auth]); // to make sure we have user in initial render

//   const [openEmployeeInfoRightBar, setOpenEmployeeInfoRightBar] =
//     useState(false);

//   const handleOpenEmployeeInfoRightBar = () => {
//     setOpenEmployeeInfoRightBar(!openEmployeeInfoRightBar);
//   };

//   const handleUserSwitchClick = (user: NavListUser) => {
//     if (disable) {
//       return;
//     }

//     setUserId(user._id);
//     toast.success("User Switched!");
//   };

//   const {
//     user,
//     isLoading: isGetLoading,
//     isError,
//     refetch: refetchUser,
//   } = useGetAccount(userId);

//   if (isError) {
//     return <>Error fetching user data (404 Not Found)</>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen ">
//       <Header
//         handleIsMenuOpen={handleIsMenuOpen}
//         handleOpenEmployeeInfoRightBar={handleOpenEmployeeInfoRightBar}
//       />
//       <div className="flex-1 relative flex flex-row w-full ">
//         <div
//           className={`w-10 bg-gray-700 flex-col items-center md:flex ${
//             !isMenuOpen && "hidden"
//           }`}
//         >
//           <div className="w-full h-9">
//             <UserInfoNav
//               handleClick={handleUserSwitchClick}
//               refetch={refetchUser}
//             />
//           </div>
//           <div className="w-full h-9">
//             <SettingNav />
//           </div>
//         </div>
//         <div className="flex-1 flex justify-center bg-gray-200">
//           {children}
//           {openEmployeeInfoRightBar && (
//             <div className=" absolute right-0 top-0 w-[400px] h-full flex flex-col z-50 bg-gray-200 border-l-2 border-b-8  border-gray-700">
//               <div className="w-full h-8 bg-gray-700 flex justify-between px-2 items-center">
//                 <span className=" text-white text-xs">Employee Info.</span>
//                 <span>
//                   <button
//                     className="text-white"
//                     onClick={() => setOpenEmployeeInfoRightBar(false)}
//                   >
//                     <X size={20} />
//                   </button>
//                 </span>
//               </div>

//               <div className="p-4 ">
//                 <EmployeeInfoRightBar user={user} />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;


