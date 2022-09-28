/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import buildings from "assets/images/buildings.jpg";

export const Buildings = ({ setCurrentStep }) => {
	return (
		<div className="buildings">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				space="preserve"
				version="1.1"
				viewBox="0 0 1860.83 1077.32"
				xlink="http://www.w3.org/1999/xlink"
			>
				<g>
					<g>
						<rect className="master__rect" width="1860.83" height="1077.32"></rect>
						<image href={buildings} width="1860" height="1077"></image>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/10/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок A' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок A"
								data-house-id="48"
								points="895.11,421.05 905.63,165.05 967.91,155.25 967.91,139.95 1090.26,122.73 1185.52,165.35 1185.52,179.81 1224.09,197.18 1224.02,205.75 1247.66,217.15 1142.84,236.97 1121.08,492.97 1030.18,436.37 998.22,442.19 986.86,435.02 932.05,445.31"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/9/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок B' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок B"
								data-house-id="49"
								points="1247.66,217.15 1268.77,227.13 1293.13,227.06 1310.42,236.3 1352.37,229.03 1390.76,246.89 1390.76,271.88 1442.91,295.86 1443.81,306.31 1461.66,314.73 1461.66,340.78 1433.94,327.62 1408.76,332.14 1397.74,326.63 1317.24,340.79 1308.52,336.96 1293.06,339.72 1275.16,341.25 1271.94,355.78 1269.03,383.79 1196.96,396.19 1196.96,405.86 1178.4,409.04 1161.93,641.14 1147.9,629.92 1148.16,620.74 1141.53,615.13 1141.27,602.63 1119.59,588.35 1124.6,495.06 1121.08,492.97 1142.84,236.97"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/8/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок C' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок C"
								data-house-id="50"
								points="1275.16,341.25 1308.52,336.96 1317.24,340.79 1397.74,326.63 1408.76,332.14 1433.94,327.62 1555.41,385.3 1549.44,438.25 1544.03,439.7 1511.72,758.78 1508.12,759.24 1508.27,765.13 1409.77,793.09 1407.99,803.03 1325.1,825.22 1312.35,817.32 1250.95,832.06 1152.33,760.6 1178.4,409.04 1196.96,405.86 1196.96,396.19 1269.03,383.79 1271.94,355.78"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/7/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок D' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок D"
								data-house-id="51"
								points="932.05,445.31 986.86,435.02 998.22,442.19 1030.18,436.37 1124.6,495.06 1101.69,864.31 1097.87,872.92 1044.11,885.93 1043.16,897.41 948.47,923.23 920.73,919.21 797.12,949.47 737.24,900.66 711.23,894.23 646.65,834.25 652.77,459.63 803.19,431.62 812.68,438.51 825.77,435.29 818.88,431.09 818.88,421.37 857.76,415.09 895.11,421.05"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/6/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок E' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок E"
								data-house-id="52"
								points="418.2,683.87 416.48,349.5 553.67,326.1 569.85,336.9 585.15,333.84 606.57,349.45 640.09,343.02 669.93,367.04 668.7,393.36 717.83,432.23 717.96,447.49 652.77,459.63 646.65,834.25 565.59,850.96 549.14,836.42 524.66,830.68 515.48,823.03 422.9,723.56 424.04,693.34"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/4/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок G' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок G"
								data-house-id="53"
								points="507.45,219.91 528.93,216.67 540.03,209.41 611.57,199.08 611.57,177.27 661.69,169.62 693.82,187.98 735.05,182.53 756.47,185.02 782.1,181 847.72,218.11 842.76,417.52 818.88,421.37 818.88,431.09 825.77,435.29 812.68,438.51 803.19,431.62 717.96,447.49 717.83,432.23 668.7,393.36 669.93,367.04 640.09,343.02 606.57,349.45 585.15,333.84 569.85,336.9 564.69,333.46 563.69,260.46"
							></polygon>
						</a>
						<a
							href="javascript:void(0);"
							onclick="BX.SidePanel.Instance.open('/legenda-house/5/view/',{cacheable: false, width: 4000, customLeftBoundary: 0, requestMethod: 'POST', requestParams: { data: 'Блок F' } });"
						>
							<polygon
								onClick={() => setCurrentStep(2)}
								className="master__block"
								data-id="Блок F"
								data-house-id="54"
								points="564.69,333.46 563.69,260.46 507.45,219.91 470.34,224.88 450.73,210.25 300.38,230.81 309.27,578.47 352.5,632.61 351.93,637.39 374.69,659.39 392.48,659.77 418.2,683.87 416.48,349.5 552.46,326.31"
							></polygon>
						</a>
					</g>
				</g>
			</svg>
		</div>
	);
};
