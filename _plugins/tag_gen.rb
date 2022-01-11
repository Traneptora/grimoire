# from https://github.com/jfromaniello/joseoncodecom/raw/master/_plugins/tag_gen.rb
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag, subtag)
      @site = site
      @base = base
      @dir = "../"
      @name = dir + '.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      if subtag != nil
        self.data['tag'] = tag['tag']
        self.data['subtag'] = subtag['subtag']
        self.data['title'] = "#{tag['name']}: #{subtag['name']}"
      else
        self.data['tag'] = tag
        self.data['subtag'] = nil
        self.data['title'] = tag.capitalize
      end
    end
  end

  class TagGenerator < Generator
    safe true
    def generate(site)
      if site.layouts.key? 'tag_index'
        dir = site.config['tag_dir'] || 'tags'
        site.tags.keys.each do |tag|
          write_tag_index(site, File.join(dir, tag), tag, nil)
          site.data['classes'].each do |clazz|
            if clazz['tag'] == tag && clazz['subclasses'] != nil
              clazz['subclasses'].each do |subclazz|
                write_tag_index(site, File.join(dir, "#{clazz['tag']}-#{subclazz['subtag']}"), clazz, subclazz)
              end
            end
          end
        end
      end
    end
    def write_tag_index(site, dir, tag, subtag)
      index = TagIndex.new(site, site.source, dir, tag, subtag)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end