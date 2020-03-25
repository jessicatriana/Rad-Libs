class CompletedRadLibsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index 
    completed = CompletedRadLib.all
    render json: completed, only: [:name, :content]
  end

  def show 
    rad_lib = CompletedRadLib.find_by(id: params[:id])
    render json: rad_lib, only: [:name, :content]
  end

  def create 
    completed = CompletedRadLib.new(
      name: params[:name],
      content: params[:content]  
    ) 
    completed.save
    
    render json: completed
  end

  def destroy 
    rad_lib = RadLibTemplate.find_by(id: params[:id])
    rad_lib.destroy

    render json: rad_lib
  end
end
