# from https://github.com/jfromaniello/joseoncodecom/raw/master/_plugins/tag_gen.rb
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag, subtag, subtag_list)
      @site = site
      @base = base
      @dir = "../"
      @name = dir + '.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      if subtag != nil
        self.data['tag'] = tag['tag']
        self.data['subtag'] = subtag['tag']
        self.data['title'] = "#{tag['name']}: #{subtag['name']}"
        self.data['parent'] = tag['name']
        self.data['subtags'] = nil
      else
        self.data['tag'] = tag
        self.data['subtag'] = nil
        self.data['title'] = tag.capitalize
        self.data['subtags'] = subtag_list
      end
    end
  end

  class TagGenerator < Generator
    safe true

    def write_tag(site, dir, clazz, tag)
      write_tag_index(site, File.join(dir, tag), tag, nil, clazz['subtags'])
      if clazz['subtags'] != nil
        clazz['subtags'].each do |subclazz|
          write_tag_index(site, File.join(dir, "#{clazz['tag']}-#{subclazz['tag']}"), clazz, subclazz, nil)
        end
      end
    end

    def generate(site)
      if site.layouts.key? 'tag_index'
        dir = site.config['tag_dir'] || 'tags'
        tags_done = []
        site.data['classes'].each do |clazz|
          write_tag(site, dir, clazz, clazz['tag'])
          tags_done.push(clazz['tag'])
        end
        site.data['properties'].each do |clazz|
          write_tag(site, dir, clazz, clazz['tag'])
          tags_done.push(clazz['tag'])
        end
        site.tags.keys.each do |tag|
          if not tags_done.include? tag
            write_tag_index(site, File.join(dir, tag), tag, nil, nil)
          end
        end
      end
    end
    def write_tag_index(site, dir, tag, subtag, subtag_list)
      index = TagIndex.new(site, site.source, dir, tag, subtag, subtag_list)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end
