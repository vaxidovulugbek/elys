import React from "react";

export const UserCard = () => {
	return (
		<div className="profile-detail card-box">
			<div>
				<img src={require("assets/images/profile.png")} alt="profile" />
				<ul className="list-inline status-list">
					<li className="list-inline-item">
						<h3 className="text-primary">1</h3>
						<p className="text-muted">Objects</p>
					</li>
					<li className="list-inline-item">
						<h3 className="text-success">
							562
							<span className="flats-limit">/ 1000</span>
						</h3>
						<p className="text-muted">Promises</p>
					</li>
				</ul>
				<hr />
				<h4 className="profile-tariff">Tariff Test</h4>
				<p className="text-muted profile-valid">
					Valid until
					<span>2022-08-15</span>
				</p>
				<div className="profile-plan-btn">
					<a href="#!"> Choose a plan </a>
				</div>
				<hr />
				<h4 className="info-text">Profile</h4>
				<div className="text-left">
					<p className="text-muted">
						<strong>User ID:</strong>
						<span>3348</span>
					</p>
					<p className="text-muted">
						<strong>Name:</strong>
						<span>Abdufattox</span>
					</p>
					<p className="text-muted">
						<strong>Phone:</strong>
						<span>998935010909</span>
					</p>
					<p className="text-muted">
						<strong>Email:</strong>
						<span>rasulmuh2000@gmail.com</span>
					</p>
				</div>
				<div className="edit-btn">
					<a href="#!">Edit</a>
				</div>
			</div>
		</div>
	);
};
