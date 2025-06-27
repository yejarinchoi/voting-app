class HomeController < ApplicationController
  def index
    @message = "Vote for your favorite performer!"
  end

  def results
    @performers_tally = Performer.all.map do |performer|
      name = performer.name
      count = Voter.where(performer_id: performer.id).count

      {name: name, count: count}
    end
  end
end
