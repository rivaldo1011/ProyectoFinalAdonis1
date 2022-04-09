import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthsSchema extends BaseSchema {
  protected tableName = 'auths'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('username', 255).notNullable()
      table.enu('tipo_usuario', ['usuario', 'administrador'])
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
