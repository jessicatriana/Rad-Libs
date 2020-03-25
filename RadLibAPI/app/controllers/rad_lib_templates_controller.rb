class RadLibTemplatesController < ApplicationController

  def index 
    templates = RadLibTemplate.all 
    render json: templates, only: [:id, :name, :content, :word_blank], inlcude: :completed_rad_libs
  end

  def show
    template = RadLibTemplate.find(params[:id])
    render json: template, only: [:id, :name, :content, :word_blank], inlcude: :completed_rad_libs
  end

  def create
    rad_lib = RadLibTemplate.new(rad_lib_template_params(:name, :content, :word_blank))
    rad_lib.save
   
    render json: rad_lib
  end

end
