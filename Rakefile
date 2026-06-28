require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'jekyll'
require 'shellwords'

desc "Generate blog files"
task :generate do
  Dir.chdir "dist/"
  system "git reset --hard"
  system "git clean -dfx"
  system "git pull --rebase"
  Dir.chdir "../"
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "dist"
  })).process
  system "find dist/ -type f -name '*.html' -exec scripts/postproc.sh {} \\;"
  system "rm -f -r dist/scripts/"
end

desc "Generate and publish blog to grimoire-dist"
task :publish => [:generate] do
  Dir.chdir "dist/"
  message = "Site updated at #{Time.now.utc}"
  system "git add -Av"
  system "git commit -m #{message.shellescape}"
  system "git push"
  Dir.chdir ".."
  puts "Published!"
end

task :default => :generate
