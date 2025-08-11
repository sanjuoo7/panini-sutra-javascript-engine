#!/usr/bin/env node

/**
 * Autonomous Panini Sutra Workflow 
 * Runs workflow automatically with AI verification
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// Auto-generate AI prompts for each workflow step
function generateAIWorkflowPrompt(sutraNumber) {
  const workflow = loadWorkflow();
  let prompt = `Please implement Panini sutra ${sutraNumber} following this systematic workflow:\n\n`;
  
  workflow.sutra_workflow.forEach((phase, phaseIndex) => {
    prompt += `## Phase ${phaseIndex + 1}: ${phase.phase}\n`;
    prompt += `${phase.description}\n\n`;
    
    phase.steps.forEach((step, stepIndex) => {
      prompt += `### Step ${phaseIndex + 1}.${stepIndex + 1}: ${step.id}\n`;
      prompt += `**Action:** ${step.action}\n`;
      prompt += `**Verification Required:** ${step.verify}\n\n`;
    });
  });
  
  prompt += `\nPlease work through each step systematically, providing verification output for each step as you complete it.`;
  return prompt;
}

// Usage
const sutraNumber = process.argv[2];
if (!sutraNumber) {
  console.log("Usage: node autonomous-workflow.js <sutra-number>");
  console.log("Example: node autonomous-workflow.js 1.2.15");
  process.exit(1);
}

console.log(generateAIWorkflowPrompt(sutraNumber));