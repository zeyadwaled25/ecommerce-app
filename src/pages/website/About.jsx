export default function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="about-container">
          <h1 className="title mb-3">About the Project</h1>
          <p className="text mb-4">
            This project is an online shopping platform offering a curated selection
            of high-quality products at affordable prices. We carefully test and
            review every item to ensure you get the best value—no fluff, no fake
            promises, just products that work for you. Our goal is to make your
            shopping experience simple, reliable, and enjoyable.
          </p>
          <p className="text">
            Your feedback is important to us! If you have any questions or
            suggestions, feel free to reach out. We’re always here to help and
            improve your experience.
          </p>
          <ul className="icons list-unstyled d-flex justify-content-center">
          <li onClick={() => {
              window.open('https://www.facebook.com/profile.php?id=61552975798511&mibextid=ZbWKwL', '_blank');
            }}>
              <i className="bi bi-facebook"></i>
            </li>
            <li onClick={() => {
              window.open('https://www.instagram.com/zeyad_w_hassaballah?igsh=MWZ5ZWF4M2FnbGdueA==', '_blank');
            }}>
              <i className="bi bi-instagram"></i>
            </li>
            <li onClick={() => {
              window.open('https://www.linkedin.com/in/zeyad-waled-3504a9295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
            }}>
              <i className="bi bi-linkedin"></i>
            </li>
            <li onClick={() => {
              window.open('https://github.com/zeyadwaled25', '_blank');
            }}>
              <i className="bi bi-github"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
