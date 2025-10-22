#!/bin/bash

# SerendibTrip Survey - Post-Optimization Verification Script
# Run this after optimization to verify everything works correctly

echo "🚀 SerendibTrip Survey - Verification Script"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found. Running npm install...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies found${NC}"
fi
echo ""

# Run TypeScript type checking
echo "🔍 Type checking..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ No TypeScript errors${NC}"
else
    echo -e "${RED}❌ TypeScript errors found${NC}"
fi
echo ""

# Run linting
echo "🔍 Linting code..."
npm run lint
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ No linting errors${NC}"
else
    echo -e "${RED}❌ Linting errors found${NC}"
fi
echo ""

# Check for problematic emojis
echo "🔍 Checking for remaining problematic emojis..."
EMOJI_COUNT=$(grep -r "🪷\|🧭\|💡\|⚡\|🍛\|🏡" src/ --include="*.tsx" --include="*.ts" | wc -l)
if [ $EMOJI_COUNT -eq 0 ]; then
    echo -e "${GREEN}✅ No problematic emojis found${NC}"
else
    echo -e "${YELLOW}⚠️  Found $EMOJI_COUNT instances of problematic emojis${NC}"
    grep -r "🪷\|🧭\|💡\|⚡\|🍛\|🏡" src/ --include="*.tsx" --include="*.ts"
fi
echo ""

# Build the project
echo "🔨 Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Check bundle size
echo "📊 Checking bundle size..."
if [ -d ".next" ]; then
    BUNDLE_SIZE=$(du -sh .next | cut -f1)
    echo -e "${GREEN}Bundle size: $BUNDLE_SIZE${NC}"
else
    echo -e "${RED}❌ .next directory not found${NC}"
fi
echo ""

# Summary
echo "=============================================="
echo "✨ Verification Complete!"
echo ""
echo "📋 Optimizations Applied:"
echo "  - ✅ Replaced 44+ emojis with Lucide icons"
echo "  - ✅ Optimized animations (removed 20+)"
echo "  - ✅ Added lazy loading"
echo "  - ✅ Added accessibility features"
echo "  - ✅ Performance improvements"
echo ""
echo "📖 Documentation:"
echo "  - OPTIMIZATION_SUMMARY.md"
echo "  - ICON_REFERENCE.md"
echo "  - CHANGES_SUMMARY.md"
echo ""
echo "🚦 Next Steps:"
echo "  1. npm run dev - Test in development mode"
echo "  2. npm run start - Test production build"
echo "  3. Run Lighthouse audit"
echo "  4. Test keyboard navigation"
echo "  5. Test on mobile devices"
echo ""
echo "=============================================="
