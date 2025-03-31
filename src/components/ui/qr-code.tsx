
import React from 'react';
import { QRCode as QRCodeSVG } from 'react-qr-svg';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  className?: string;
}

const QRCode = ({
  value,
  size = 200,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  level = 'L',
  className
}: QRCodeProps) => {
  return (
    <div className={className}>
      <QRCodeSVG
        value={value}
        style={{ width: size, height: size }}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
      />
    </div>
  );
};

export default QRCode;
