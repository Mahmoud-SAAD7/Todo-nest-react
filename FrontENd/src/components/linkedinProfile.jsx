// // ProfileComponent.jsx

// import React, { useState } from "react";
// import axios from "axios";

// export default function ProfileComponent() {
//   const [profileData, setProfileData] = useState(null);
//   const [linkedinUrl, setLinkedinUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/linkedin", { linkedinUrl });
//       setProfileData(response.data);
//     } catch (error) {
//       console.error("Error fetching LinkedIn profile data:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={linkedinUrl}
//           onChange={(e) => setLinkedinUrl(e.target.value)}
//           className="w-full px-3 py-2 mb-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-blue-500"
//           placeholder="LinkedIn URL"
//         />
//         <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Fetch Profile</button>
//       </form>
//       {profileData && (
//         <div>
//           <h2>{profileData.name}</h2>
//           <img src={profileData.photoUrl} alt="Profile" />
//           <p>LinkedIn URL: {profileData.linkedinUrl}</p>
//           {/* Display more profile data here... */}
//         </div>
//       )}
//     </div>
//   );
// }
