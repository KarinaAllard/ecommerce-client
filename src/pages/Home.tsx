import "../styles/home.css"

export const Home = () => {
	return (
		<div className="home-wrapper">
			<h1>Welcome to Frittte Kiosk</h1>

			<h3>That's Frittte with three T-s.</h3>
			<p>
				<em>
					I think they think that extra T makes it *funkier*... It doesn't.
				</em>
			</p>

			<h2>Meet the staff:</h2>
			<div>
				<div className="frittte-employees">
					<div className="frittte-div">
						<img
							src="https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/b/bc/Portrait_fritte.png"
							alt="Frittte clerk"
						/>
						<h4>Frittte Clerk</h4>
						<p>
							She is the clerk in the Frittte store and sells some old shoes,
							raincoats made by Frittte, hats and other paraphernalia. Our
							lovely clerk is the person that packs your orders and answers any
							concerns you might have.
						</p>
					</div>
					<div className="frittte-div">
						<img
							src="https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/8/83/Portrait_you.png"
							alt="You"
						/>
						<h4>Raphaël Ambrosius</h4>
						<p>
							He is our lovely model that all of our clothes are fitted after.
							If you have the body type of a long retired, mid forties gym
							teacher who has seen it all, we guarantee that our clothes
							will fit perfectly.
						</p>
					</div>
				</div>
                <h3>Thanks for reading!</h3>
                <p>Can we offer you a complementary bag?</p>
                <img src="https://static.wikia.nocookie.net/discoelysium_gamepedia_en/images/f/f2/Yellow_plastic_bag.png" alt="Plastic bag" />
			</div>
		</div>
	);
};
