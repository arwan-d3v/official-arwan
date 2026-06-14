'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ATSTemplate } from './templates/ATSTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CVData } from './types';

interface LiveCVViewerProps {
  data: CVData;
  templateType: string;
  isVip: boolean;
}

export default function LiveCVViewer({ data, templateType, isVip }: LiveCVViewerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={templateType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        {templateType === 'ATS_OPTIMIZED' ? (
          <ATSTemplate data={data} isVip={isVip} />
        ) : (
          <ModernTemplate data={data} isVip={isVip} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
