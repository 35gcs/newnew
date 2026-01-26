'use client';

import { AssessmentProvider } from '@/lib/assessment-context';
import { AssessmentFlow } from '@/components/AssessmentFlow';

export default function AssessmentPage() {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  );
}
