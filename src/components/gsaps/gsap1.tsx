"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import styles from "./gsap1.module.css";
import {
  navLinks,
  cocktailLists,
  mockTailLists,
  featureLists,
  goodLists,
  openingHours,
  storeInfo,
  socials,
  allCocktails,
} from "./gsap1Data";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Gsap1() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = document.querySelector(`.${styles.heroTitle}`);
      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }

      const sections = gsap.utils.toArray<HTMLElement>(`.${styles.section}`);
      sections.forEach((section: HTMLElement) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <p className={styles.brand}>JSM Cocktail</p>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <section id="hero" className={`${styles.section} ${styles.hero}`}>
          <h1 className={styles.heroTitle}>Cocktail Artistry</h1>
          <p className={styles.heroSubtitle}>
            A GSAP-powered landing page experiment inspired by a cocktail bar.
          </p>
        </section>

        <section
          id="cocktails"
          className={`${styles.section} ${styles.cocktailsSection}`}
        >
          <h2 className={styles.sectionTitle}>Popular Cocktails</h2>
          <div className={styles.cocktailsGrid}>
            <div>
              <h3>Classics</h3>
              <ul>
                {cocktailLists.map((item) => (
                  <li key={item.name} className={styles.cocktailItem}>
                    <div>
                      <h4>{item.name}</h4>
                      <p className={styles.cocktailMeta}>
                        {item.country} · {item.detail}
                      </p>
                    </div>
                    <span className={styles.cocktailPrice}>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Mocktails</h3>
              <ul>
                {mockTailLists.map((item) => (
                  <li key={item.name} className={styles.cocktailItem}>
                    <div>
                      <h4>{item.name}</h4>
                      <p className={styles.cocktailMeta}>
                        {item.country} · {item.detail}
                      </p>
                    </div>
                    <span className={styles.cocktailPrice}>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`${styles.section} ${styles.aboutSection}`}
        >
          <h2 className={styles.sectionTitle}>Why it&apos;s good</h2>
          <ul className={styles.bulletList}>
            {featureLists.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <ul className={styles.bulletList}>
            {goodLists.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </section>

        <section
          id="work"
          className={`${styles.section} ${styles.gallerySection}`}
        >
          <h2 className={styles.sectionTitle}>Signature drinks</h2>
          <div className={styles.cardGrid}>
            {allCocktails.map((cocktail) => (
              <article key={cocktail.id} className={styles.card}>
                <div className={styles.cardImagePlaceholder} />
                <div className={styles.cardBody}>
                  <h3>{cocktail.name}</h3>
                  <p className={styles.cardTitle}>{cocktail.title}</p>
                  <p className={styles.cardDescription}>
                    {cocktail.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`${styles.section} ${styles.contactSection}`}
        >
          <h2 className={styles.sectionTitle}>{storeInfo.heading}</h2>
          <p className={styles.address}>{storeInfo.address}</p>

          <div className={styles.contactGrid}>
            <div>
              <h3>Contact</h3>
              <p>{storeInfo.contact.phone}</p>
              <p>{storeInfo.contact.email}</p>
            </div>
            <div>
              <h3>Opening hours</h3>
              <ul>
                {openingHours.map((entry) => (
                  <li key={entry.day}>
                    <span>{entry.day}</span>
                    <span>{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Socials</h3>
              <ul>
                {socials.map((s) => (
                  <li key={s.name}>{s.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}