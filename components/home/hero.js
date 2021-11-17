import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/home/robin.jpg" width={300} height={300} />
      </div>
      <h1>Hello , I'm Robin</h1>
      <p>
        I'm a Frontend Developer - especially frontend framework react , nextJs
        , and GatsbyJS
      </p>
    </section>
  );
}

export default Hero;
