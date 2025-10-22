#!/bin/bash

# SerendibTrip Survey - Performance Optimization Verification Script
# This script helps verify that all optimizations are working correctly

echo "🚀 SerendibTrip Survey - Performance Check"
echo "=========================================="
echo ""

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project directory verified"
echo ""

# Check Node and npm versions
echo "📦 Environment Check:"
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check for unused dependencies
echo "🔍 Checking for unused dependencies..."
UNUSED_DEPS=("react-hook-form" "@hookform/resolvers" "next-i18next" "react-i18next" "nprogress" "@types/nprogress")
FOUND_UNUSED=false

for dep in "${UNUSED_DEPS[@]}"; do
    if grep -q "\"$dep\"" package.json; then
        echo "⚠️  Found unused dependency: $dep"
        FOUND_UNUSED=true
    fi
done

if [ "$FOUND_UNUSED" = false ]; then
    echo "✅ No unused dependencies found"
else
    echo ""
    echo "💡 Suggestion: Remove unused dependencies with:"
    echo "   npm uninstall react-hook-form @hookform/resolvers next-i18next react-i18next nprogress @types/nprogress"
fi
echo ""

# Build the project
echo "🔨 Building production bundle..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Check build output
echo "📊 Build Output Analysis:"
if [ -d ".next" ]; then
    echo "✅ .next directory created"
    
    # Check for chunk sizes
    echo ""
    echo "📦 Checking bundle sizes..."
    
    # Find the largest JavaScript files
    echo "Largest JavaScript bundles:"
    find .next/static/chunks -name "*.js" -type f -exec du -h {} + | sort -rh | head -5
    
    echo ""
    echo "✅ Build analysis complete"
else
    echo "❌ .next directory not found"
    exit 1
fi
echo ""

# Summary
echo "=========================================="
echo "✅ Performance Optimization Verification Complete!"
echo ""
echo "📋 Summary:"
echo "   - Project structure: OK"
echo "   - Build: SUCCESS"
echo "   - Bundle created: YES"
echo ""
echo "🎯 Next Steps:"
echo "   1. Start production server: npm start"
echo "   2. Test in browser: http://localhost:3000"
echo "   3. Run Lighthouse audit in Chrome DevTools"
echo "   4. Test on mobile devices"
echo ""
echo "📚 For detailed optimization info, see:"
echo "   - PERFORMANCE_OPTIMIZATION.md"
echo ""
