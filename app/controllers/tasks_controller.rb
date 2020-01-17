class TasksController < ApplicationController

	def index
		#@tasks = Task.all
		task = Task.all.order(created_at: :desc)
		render json: task
	end
	
	def new
		@task = Task.new
	end
	
	def show
		#@task = Task.find(params[:id])
		if task
			render json: task
		else
			render json: task.errors
		end
	end

	def edit
		@task = Task.find(params[:id])
	end

	def create
		#@task = Task.new(task_params)
		#if @task.save
		#	redirect_to @task
		#else
		#	render 'new'
		#end
		task = Task.create!(task_params)
		if task
			render json: task
		else
			render json: task.errors
		end
	end

	def search
		query = params[:query]
		task = Task.where('category LIKE ?', "%#{query}%")
		render json: task
	end

	def update
		task = Task.find(params[:id])
		task.update(task_params)
		render json: task
	end

	def destroy
		Task.destroy(params[:id])
		task = Task.all.order(created_at: :desc)
		render json: task
	end	

	private
	def task_params
		params.permit(:title, :description, :date, :category)
	end

	def task
		@task ||= Task.find(params[:id])
	end


end
