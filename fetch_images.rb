require 'pry'
require 'open-uri'

text_files = Dir.glob('./results/*.txt')
text_files.each do |text_file|
  content = File.read(text_file)
  urls = content.split("\n")
  urls.each do |url|
    if url.start_with? 'https://static.pexels.com/photos/'
      name = ''
      target_url = url.sub(/(.*?)\/(\d+)\/(.*?)-medium(.*$)/) do
        extention = Regexp.last_match(4)
        extention = '.jpg' if extention == '.jpeg'
        name = Regexp.last_match(3) + '-' + Regexp.last_match(2) + extention
        Regexp.last_match(1) + '/' + Regexp.last_match(2) + '/' + Regexp.last_match(3) + Regexp.last_match(4)
      end
      puts name
      sleep 2
      type = text_file.match(/results\/(.*?)\.txt$/) { Regexp.last_match(1) }
      dirname = "images/#{type}"
      Dir.mkdir(dirname) unless Dir.exist? dirname
      File.open("images/#{type}/#{name}", 'wb') do |fo|
        begin
          fo.write open(target_url).read
        rescue => e
          puts e.message
        end
      end
    end
  end
end
