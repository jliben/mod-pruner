export declare const CONFIG_FILENAME = ".modprunerrc";
export declare const DEFAULT_GLOBS = "\n__tests__/\n.airtap.yml\n.babelrc\n.circleci/\n.clang-format\n.commitlintrc.json\n.coveralls.yml\n.documentup.json\n.editorconfig\n.eslintignore\n.eslintrc\n.eslintrc.js\n.eslintrc.json\n.eslintrc.yaml\n.eslintrc.yml\n.flowconfig\n.gitattributes\n.github/\n.gitignore\n.gitmodules\n.husky/\n.istanbul.yml\n.jscs.json\n.jscsrc\n.jshintrc\n.npmignore\n.npmrc\n.nvmrc\n.nyc_output\n.nycrc\n.prettierrc\n.prettierrc.js\n.prettierrc.yaml\n.release-it.json\n.releaserc.json\n.runkit_example.js\n.stylelintrc.json\n.tern-project\n.travis.yml\n.zuul.yml\n*.png\n*.jp?g\n*.gif\n*.bak\n*.iml\n*.log\n*.txt\n*.patch\nappveyor.yml\nAUTHORS\nNOTICE\n.mergify.yml\n*.bazel\nbabel.config.js\nChangeLog\nCHANGELOG.md\nCHANGES\ncircle.yml\nCONTRIBUTING.md\ncoverage/\ndoc/\ndocs/\nexample/\nexamples/\nGruntfile.js\ngulpfile*.js\nHISTORY.md\njest.config.js\nkarma.conf.js\nlerna.json\nnodemon.json\npackage-lock.json\nprettier.config.js\nREADME.md\nrenovate.json\nrollup.config.js\ntest/\ntests/\ntsconfig*.json\ntslint.json\nwercker.yml\nyarn.lock\nCODE_OF_CONDUCT.md\nAUTHORS.md\nSECURITY.md\n.browserslistrc\n\n\n# Relatively safe\n*.flow\n*.mjs.map\n*.js.map\n*.ts.map\n*.ts\n*.spec.ts\n*.spec.js\nbower.json\nMakefile*\n*.sh\n\n\n# Unsafe\n*.md\n*.mkd\n*.markdown\n\n\n!build-long.md  # This file is used by @angular/cli\n!*.d.ts         # Always keep .ts definition files\n\n";