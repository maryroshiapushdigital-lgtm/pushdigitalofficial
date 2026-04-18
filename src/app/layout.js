import './globals.css';
import CustomCursor from './components/CustomCursor/CustomCursor';
import LightEffect from './components/LightEffect/LightEffect';

export const metadata = {
  title: 'Push Digital - Flexible Electronics Manufacturing',
  description:
    'Enabling the Future of Electronics with flexible, functional, and scalable solutions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <div className="cursor-light"></div>
        <LightEffect />
        {children}
      </body>
    </html>
  );
}