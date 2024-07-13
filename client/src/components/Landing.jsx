//  // Adjust the path to your image file
// import "../css/Home.css"; // Import the custom CSS file

// export default function Home() {
//   return (
//     <div className="bg-dashboard">
//       <div className="flex flex-col  items-center g-5 py-5 bg-blue-900">
//         <div className="w-full lg:w-1/2 p-10">
//           <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-white">
//             Intelligent Health and Lifestyle Recommendations
//           </h1>
//           <p className="text-lg text-white text-justify">
//             Our app uses advanced AI models to provide personalized
//             recommendations based on your health and lifestyle inputs. Stay
//             ahead with tailored advice designed to improve your well-being and
//             quality of life.
//           </p>
//         </div>
//       </div>
//       <div className="py-5 bg-white mt-8 px-5">
//         <h2 className="text-2xl lg:text-3xl font-bold mb-5 text-center text-blue-900">
//           Features
//         </h2>
//         <div className="flex flex-col lg:flex-row gap-5 items-center ">
//         <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
//             <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
//               Intelligent Drug Search
//             </h3>
//             <p className="text-lg text-gray-700">
//               Get advice based on your health and lifestyle.
//               AI-driven recommendations help you make better choices every day.
//             </p>
//           </div>
//           <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
//             <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
//               Personalized Drug Tracker
//             </h3>
//             <p className="text-lg text-gray-700">
//               Keep track of your health metrics with our intuitive tracker.
//               Monitor your progress and stay motivated to reach your health
//               goals.
//             </p>
//           </div>
//           <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
//             <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
//               Profile Management
//             </h3>
//             <p className="text-lg text-gray-700">
//               Stay informed with our latest articles on health, fitness, and
//               lifestyle trends, written by experts in the field.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// Adjust the path to your image file
import '../css/Home.css'; // Import the custom CSS file

export default function Home() {
  return (
    <div className="bg-dashboard">
      <div className="flex flex-col items-center g-5 py-5 bg-blue-900">
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-2xl lg:text-4xl font-bold mb-3 text-white">
            Intelligent Drug Information and Management
          </h1>
          <p className="text-lg text-white text-justify">
            Our app leverages advanced AI to provide comprehensive drug
            information and personalized management tools. Stay informed and
            make safe choices with our intelligent drug search and tracking
            features.
          </p>
        </div>
      </div>
      <div className="py-5 bg-white mt-8 px-5">
        <h2 className="text-2xl lg:text-3xl font-bold mb-5 text-center text-blue-900">
          Features
        </h2>
        <div className="flex flex-col lg:flex-row gap-5 items-center">
          <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
              Intelligent Drug Search with AI
            </h3>
            <p className="text-lg text-gray-700">
              Utilize our AI-driven search to find detailed drug information,
              including prohibited status, permissible quantities, and
              alternatives.
            </p>
          </div>
          <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
              Personal Drug Management
            </h3>
            <p className="text-lg text-gray-700">
              Manage your drug usage with personalized tracking tools. Monitor
              your usage, receive alerts for permissible quantities, and explore
              safe alternatives.
            </p>
          </div>
          <div className="w-full lg:w-1/3 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl lg:text-2xl font-semibold text-blue-900 mb-3">
              Profile Management
            </h3>
            <p className="text-lg text-gray-700">
              Keep your profile up-to-date with your demographic information and manage your
              search history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
