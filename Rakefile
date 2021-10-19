require 'rubygems'
    require 'rake'
    require 'rdoc'
    require 'date'
    require 'yaml'
    require 'tmpdir'
    require 'jekyll'
    require 'shellwords'

    desc "Generate blog files"
    task :generate do
      Jekyll::Site.new(Jekyll.configuration({
        "source"      => ".",
        "destination" => "_site"
      })).process
    end

    desc "Generate and publish blog to dist branch"
    task :publish => [:generate] do
      Dir.mktmpdir do |tmp|
        system "mv _site/ #{tmp}/_site/"
        system "git checkout dist"
        system "rm -rf *"
        system "mv #{tmp}/_site/* ./"
        message = "Site updated at #{Time.now.utc}"
        system "git add ."
        system "git commit -am #{message.shellescape}"
        system "git push"
        system "git checkout master"
        system "rmdir #{tmp}/_site/"
        system "echo Published!"
      end
    end

task :default => :publish
