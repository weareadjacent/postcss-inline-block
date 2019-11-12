var postcss = require('postcss');

module.exports = postcss.plugin('postcss-inline-block', function () {

    // Work with options here
    function inlineBlockFix(decl){
    	var origRule = decl.parent;
        origRule.insertAfter(decl, [
            postcss.decl({prop: 'vertical-align', value: 'middle'}),
            postcss.decl({prop: '*vertical-align', value: 'auto'}),
            postcss.decl({prop: '*zoom', value: '1'}),
            postcss.decl({prop: '*display', value: 'inline'})
        ]);
    }

    return function (css) {
        // Transform CSS AST here
        css.walkDecls('display', function(decl){
        	if(decl.value == "inline-block"){
        		inlineBlockFix(decl);
        	}
        });
    };
});
