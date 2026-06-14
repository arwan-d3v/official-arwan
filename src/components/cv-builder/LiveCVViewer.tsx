'use client';

import React from 'react';
import { ATSTemplate } from './templates/ATSTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CVData } from './types';

interface LiveCVViewerProps {
  data: CVData;
  templateType: string;
  isVip: boolean;
}

export default function LiveCVViewer({ data, templateType, isVip }: LiveCVViewerProps) {
  if (templateType === 'ATS_OPTIMIZED') {
    return <ATSTemplate data={data} isVip={isVip} />;
  }
  
  return <ModernTemplate data={data} isVip={isVip} />;
}
