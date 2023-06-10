import "@/styles/global.scss";
import "@/styles/HeaderFrame.scss";
import "@/styles/HeroSection.scss";
import "@/styles/CarouselFrame.scss";
import "@/styles/CardFrame.scss";
import "@/styles/ListFrame.scss";
import "@/styles/DetailsFrame.scss";
import "@/styles/VideoPopup.scss";
import "@/styles/TabsFrame.scss";
import "@/styles/CastCrewFrame.scss";
import "@/styles/VideoCard.scss";
import "@/styles/PaginationFrame.scss";
import "@/styles/MovieFrame.scss";
import "@/styles/PeoplesFrame.scss";
import "@/styles/PeoplesDetailsFrame.scss";
import "@/styles/SearchFrame.scss";
import "@/styles/SettingFrame.scss";

import "react-lazy-load-image-component/src/effects/blur.css";

import store from "@/redux/store";
import { Provider } from "react-redux";

import LayoutFrame from "@/components/Layouts/LayoutFrame";
import HeaderFrame from "@/components/HeaderFrame";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import SettingFrame from "@/components/SettingFrame";

export default function App({ Component, pageProps }) {
	const [setting, setSetting] = useState(false);
	return (
		<Provider store={store}>
			<LayoutFrame>
				<div className="setting-icon-section">
					<AiFillSetting
						className="setting-icon"
						onClick={(e) => setSetting(true)}
					/>
				</div>
				<SettingFrame setting={setting} setSetting={setSetting} />
				<HeaderFrame />
				<Component {...pageProps} />
			</LayoutFrame>
		</Provider>
	);
}
