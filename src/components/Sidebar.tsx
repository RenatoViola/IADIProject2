
function Sidebar() {

    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-40 overflow-y-auto bg-blue-400 dark:bg-blue-1000">
           <ul className="space-y-2 font-medium">
              <li>
                 <a href="#" className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group">

                    <span className="ms-3">List of Apartments</span>
                 </a>
              </li>

              <li>
                 <a href="#" className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group">
                    <span className="flex-1 ms-3 whitespace-nowrap">List of Reservations</span>
                 </a>
              </li>
              <li>
                 <a className="flex items-center p-2 text-blue-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group" >
                    <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                 </a>
              </li>
           </ul>
        </div>
     </aside>
    )

}

export default Sidebar;