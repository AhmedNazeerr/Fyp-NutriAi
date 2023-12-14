// import React from "react";
// import { Link } from "react-router-dom";

// export default function MenuAdmin() {
//   return (
//     <aside className="left-sidebar" data-sidebarbg="skin6">
//       <div className="scroll-sidebar" data-sidebarbg="skin6">
//         <nav className="sidebar-nav">
//           <ul id="sidebarnav">
//             <li className="sidebar-item">
//               {" "}
//               <a className="sidebar-link sidebar-link" href="/admin">
//                 <i data-feather="home" className="feather-icon"></i>
//                 <span className="hide-menu">Dashboard</span>
//               </a>
//             </li>
//             <li className="list-divider"></li>

//             <li className="nav-small-cap">
//               <span className="hide-menu">Components</span>
//             </li>
//             <li className="sidebar-item">
//               {" "}
//               <Link to="/chat" className="sidebar-link">
//   <i data-feather="message-square" className="feather-icon"></i>
//   <span className="hide-menu">Customer</span>
// </Link>




//             </li>
//             <li className="sidebar-item">
//               {" "}
//               <a className="sidebar-link sidebar-link" href="/product">
//                 <i data-feather="message-square" className="feather-icon"></i>
//                 <span className="hide-menu">Products</span>
//               </a>
//             </li>

//             <li className="sidebar-item">
//               {" "}
//               <a
//                 className="sidebar-link has-arrow"
//                 href="#"
//                 aria-expanded="false"
//               >
//                 <i data-feather="grid" className="feather-icon"></i>
//                 <span className="hide-menu">Tables </span>
//               </a>
//               <ul
//                 aria-expanded="false"
//                 className="collapse  first-level base-level-line"
//               >
//                 <li className="sidebar-item">
//                   <a href="/users" className="sidebar-link">
//                     <span className="hide-menu">Datatables Users</span>
//                   </a>
//                 </li>
//                 <li className="sidebar-item">
//                   <a href="/products" className="sidebar-link">
//                     <span className="hide-menu">Datatables Products</span>
//                   </a>
//                 </li>
//                 <li className="sidebar-item">
//                   <a href="/history" className="sidebar-link">
//                     <span className="hide-menu">Datatables History</span>
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// }

import React from "react";
import { Link } from 'react-router-dom';


export default function MenuAdmin() {
  
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              {" "}
              <Link className="sidebar-link sidebar-link" to="/admin">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li className="sidebar-item">
  <a href="/orders" className="sidebar-link">
    <i data-feather="shopping-cart" className="feather-icon"></i>
    <span className="hide-menu">Orders</span>
  </a>
</li>

<li className="sidebar-item">
  <a href="/customers" className="sidebar-link">
    <i data-feather="shopping-cart" className="feather-icon"></i>
    <span className="hide-menu">Customers</span>
  </a>
</li>

           
            <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link has-arrow"
                href="#"
                aria-expanded="false"
              >
                <i data-feather="grid" className="feather-icon"></i>
                <span className="hide-menu">Products </span>
              </a>
              <ul
                aria-expanded="false"
                className="collapse  first-level base-level-line"
              >
                <li className="sidebar-item">
                  <a href="/users" className="sidebar-link">
                    <span className="hide-menu">Category</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="/products" className="sidebar-link">
                    <span className="hide-menu">SubCategory</span>
                  </a>
                </li> 
                <li className="sidebar-item">
                  <a href="/history" className="sidebar-link">
                    <span className="hide-menu">Products</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
