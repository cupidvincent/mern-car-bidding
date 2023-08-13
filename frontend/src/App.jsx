import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'

function App() {

	return (
		<>
			<ToastContainer />
			<div>
				<Outlet />
			</div>
		</>
	);
}

export default App;
