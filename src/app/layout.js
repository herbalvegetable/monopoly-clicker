import "./globals.css";
import styles from '@/app/layout.module.css';

export const metadata = {
  title: "Monopoly Roller",
  description: "Scratch that Monopoly itch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.main}>{children}</body>
    </html>
  );
}
