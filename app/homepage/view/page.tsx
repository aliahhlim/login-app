// "use client";
// import React from "react";
// import { useEffect } from "react";
// import { message } from "antd";

// useEffect(() => {
//   // Fetching user data
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/application", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const result = await response.json();
//       const formattedData = result.map((item: any, index: number) => ({
//         num: index + 1,
//         name: item.CompanyName,
//         companyId: item.CompanyID,
//         description: item.Description,
//         date: new Date(item.CreatedDate).toLocaleDateString(), // Formatting the date
//       }));
//       setUsers(formattedData);
//     } catch (error) {
//       console.error("Error occurred:", error);
//       message.error("An error occurred while fetching applications");
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchData();
// }, []);

// export default function FormPage() {}
