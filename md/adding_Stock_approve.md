← Go back to 
[Inventories Module Documentation](/Inventories)

# adding_Stock_approve.aspx

## Overview

**File**: `\Inventories\Process\adding_Stock_approve.aspx`
**Purpose**: Final approval interface for inventory addition requests with comprehensive financial integration, supplier invoice management, and automated accounting entry generation
**Technology**: ASP.NET Web Forms with DevExpress Bootstrap controls (v18.2)
**Primary Users**: Inventory managers, finance personnel, and approval workflow administrators

## User Input Requirements and Error Prevention

### Critical User Input Requirements

#### 1. **Department and Employee Information (Auto-populated)**
- **Department Dropdown**: Hidden field, auto-populated based on user's employee record
- **Employee Dropdown**: Auto-populated from user authentication
- **Error Prevention**: System validates user has valid department assignment
- **Data Source**: DefinitionDep and DefinitionEmployee1 tables
- **Default Behavior**: Auto-populated from user profile on page load
- **Validation**: Only users with valid department assignments can access

#### 2. **Document Selection (Required for Approval)**
- **Document Number Dropdown**: Must select document number for addition approval
- **Error Prevention**: System validates document selection before data retrieval
- **Data Source**: Inventories_Examination_receipt table with filtering
- **Default Behavior**: User must select document manually
- **Error Message**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Validation**: Only documents with specific status conditions are available

#### 3. **Store Selection (Required for Approval)**
- **Store Dropdown**: Must select destination store for addition approval
- **Error Prevention**: System validates store selection before approval operations
- **Data Source**: Inventories_wharehouse_store table with user permissions
- **Default Behavior**: User must select store manually
- **Error Message**: "الرجاء اختيار المخزن" (Please select store)
- **Validation**: Only stores with user permissions are available

#### 4. **Addition Request Selection (Required for Operations)**
- **Grid Row Selection**: Must select specific addition requests for approval/rejection
- **Error Prevention**: System validates row selection before operations
- **Data Source**: Grid selection with validation
- **Default Behavior**: User must select rows manually
- **Error Message**: "Please Select document" (English message)
- **Validation**: Only selected rows are processed for approval/rejection

#### 5. **Rejection Reason (Required for Rejection)**
- **Rejection Reason Dropdown**: Must select reason for rejection
- **Error Prevention**: System validates rejection reason before rejection
- **Data Source**: Inventories_Reasons table with type filtering
- **Default Behavior**: User must select reason manually
- **Validation**: Only active rejection reasons of specific type are available

### Common Error Scenarios and Prevention

#### **Document Selection Errors**
- **Error**: "الرجاء ادخال رقم المستند" (Please enter document number)
- **Prevention**: Always select document number before searching
- **Error**: Document dropdown empty
- **Prevention**: Ensure documents with proper status conditions exist

#### **Store Selection Errors**
- **Error**: "الرجاء اختيار المخزن" (Please select store)
- **Prevention**: Always select store before approval operations
- **Error**: Store dropdown empty
- **Prevention**: Ensure user has permissions for stores

#### **Row Selection Errors**
- **Error**: "Please Select document" (English message)
- **Prevention**: Always select rows before approval/rejection operations
- **Error**: Multiple row selection conflicts
- **Prevention**: Select appropriate rows for batch operations

#### **Rejection Reason Errors**
- **Error**: Missing rejection reason
- **Prevention**: Always select rejection reason before rejection
- **Error**: Invalid rejection reason
- **Prevention**: Use valid rejection reasons from dropdown

### Starting Points and Prerequisites

#### **Before Using This Page**
1. **User must be logged in** with valid authentication
2. **User must have department assignment** in employee master data
3. **Documents must exist** with proper status conditions (Examination_done='1', receipt_done='1', Adding_indator='1', Adding_rev_indator='1', Adding_approve_indator='0')
4. **Stores must be configured** with user permissions
5. **Rejection reasons must be configured** in system
6. **Financial integration must be configured** for accounting entries
7. **Supplier invoice information must be available** for approval

#### **Required System State**
- User authentication must be active
- Department assignments must be current
- Document data must be current with proper status conditions
- Store permissions must be current
- Rejection reason master data must be current
- Financial integration must be properly configured
- Supplier invoice information must be available

### Success Criteria

#### **For Document and Store Selection**
- ✅ Document and store selection validation prevents operations without requirements
- ✅ Document dropdown shows only documents with proper status conditions
- ✅ Store dropdown shows only stores with user permissions
- ✅ User feedback confirms successful document and store selection

#### **For Addition Request Review**
- ✅ Document and store selection prevent operations without requirements
- ✅ Grid display shows addition requests with proper formatting and status
- ✅ Row selection works correctly for approval/rejection operations
- ✅ Status indicators display correctly for addition requests

#### **For Financial Integration**
- ✅ Document and store selection validation prevents operations without requirements
- ✅ Automated accounting entry generation works correctly
- ✅ Supplier invoice integration works correctly
- ✅ Financial workflow tracking works correctly

#### **For Approval Operations**
- ✅ Row selection validation prevents operations without selection
- ✅ Approval operations work correctly with proper status updates
- ✅ Rejection operations work correctly with proper status updates
- ✅ PO order quantity updates work correctly for rejections

#### **For Data Management**
- ✅ Grid refreshes after all operations
- ✅ Selection states clear after operations
- ✅ Status updates work correctly
- ✅ Success feedback confirms operations

## User Interface Components

### Main Control Panel

```html
<dx:BootstrapFormLayout runat="server" LayoutType="Vertical" dir="rtl" ID="BootstrapFormLayout">
```

**Form Layout**: Right-to-left (RTL) Bootstrap form layout with vertical structure for addition approval

### Header Information Section

```html
<!-- Header Information -->
<dx:BootstrapLayoutItem Caption="الادارة" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="Dep" runat="server" TextFormatString="{1} - {0}" AutoPostBack="True" Enabled="false" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="DepDS" ValueField="DepID" TextField="Dep_Name">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="DepID" />
                    <dx:BootstrapListBoxField FieldName="Dep_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المسؤل" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="ResponsableEmp" runat="server" TextFormatString="{0} - {1}" Enabled="false" AutoPostBack="True" EnableMultiColumn="true" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="Emp" ValueField="Emp_Code" TextField="User_Name">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="Emp_Code" />
                    <dx:BootstrapListBoxField FieldName="User_Name" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Document and Store Information Section

```html
<!-- Document and Store Information -->
<dx:BootstrapLayoutItem Caption="تاريخ الطلب" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapDateEdit runat="server" Width="100%" ID="Calendar1" Enabled="false" OnDateChanged="Calendar1_DateChanged" AutoPostBack="true"></dx:BootstrapDateEdit>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="رقم المستند" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="txt_doc_no" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="true" DataSourceID="doc_data_sorce" ValueField="doc_id" TextField="doc_id">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox ID="inv_to" runat="server" AutoPostBack="True" CallbackPageSize="15" EnableCallbackMode="false" DataSourceID="StoresPerDS" ValueField="code" TextField="english_name">
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="بحث" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="search" runat="server" ClientInstanceName="btn5" Width="100%" Text=" بحث " OnClick="search_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn5,'btn5'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Addition Request Grid Section

```html
<!-- Addition Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="grid_GridView1" ClientInstanceName="gridre" AutoGenerateColumns="false" AutoPostBack="True" KeyFieldName="ID" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource7" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="false" SettingsBehavior-ProcessFocusedRowChangedOnServer="true" SettingsBehavior-ProcessSelectionChangedOnServer="true" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="grid_GridView1_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewCommandColumn VisibleIndex="0" ShowSelectCheckbox="True" Width="30px"></dx:BootstrapGridViewCommandColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم المورد" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="16"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم المستند" Visible="false" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" VisibleIndex="23"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="25"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="26"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Id_unit" Caption="وحدة التخزين" Visible="false" VisibleIndex="27"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_storage_unit" Caption="وحدة التخزين" Visible="true" VisibleIndex="28"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_Exchange_unit" Caption="وحدة الصرف" Visible="true" VisibleIndex="29"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Exchange_id_unit" Caption="وحدة الصرف" Visible="false" VisibleIndex="30"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_q" Caption="الكمية بوحدة الاستلام" Visible="true" VisibleIndex="31"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_q" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="32"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exchange_q" Caption="الكمية بوحدة الاستخدام" Visible="true" VisibleIndex="33"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Sup_Code_fk" Caption="كود المورد" Visible="false" VisibleIndex="33"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Approval Operations Section

```html
<!-- Approval Operations -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="2" BeginRow="true">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="Adding" runat="server" ClientInstanceName="btn4" Width="100%" Text=" اعتماد الاضافة " OnClick="Adding_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn4,'btn4'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Success" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="سبب الرفض" CaptionSettings-HorizontalAlign="Right" ColSpanMd="4">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapComboBox AutoPostBack="true" runat="server" TextField="reason" ValueField="id" DataSourceID="dsReasons" EnableMultiColumn="true" CallbackPageSize="15" Enabled="true" Width="100%" ID="emp_reason">
                <Fields>
                    <dx:BootstrapListBoxField FieldName="reason" />
                </Fields>
            </dx:BootstrapComboBox>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
<dx:BootstrapLayoutItem Caption="." CaptionSettings-HorizontalAlign="Right" ColSpanMd="2">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapButton ID="reject" runat="server" ClientInstanceName="btn3" Width="100%" Text=" رفض الاضافة " OnClick="reject_Click">
                <ClientSideEvents Click="function(s, e) { DisableButton3(btn3,'btn3'); }" />
                <CssClasses Icon="simple-icon-magnifier" />
                <SettingsBootstrap RenderOption="Danger" />
            </dx:BootstrapButton>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

### Approved Addition Requests Grid Section

```html
<!-- Approved Addition Requests Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" CaptionSettings-HorizontalAlign="Right" ColSpanMd="12">
    <ContentCollection>
        <dx:ContentControl>
            <dx:BootstrapGridView runat="server" ID="Bootstrap_end_adding" ClientInstanceName="gridre" AutoGenerateColumns="false" KeyFieldName="ID" AutoPostBack="True" Styles-Cell-HorizontalAlign="Center" DataSourceID="SqlDataSource1" Styles-Cell-VerticalAlign="Middle" Styles-Header-VerticalAlign="Middle" Styles-Header-HorizontalAlign="Center" Font-Size="Small" EnableCallBacks="false" SettingsBehavior-AllowSelectSingleRowOnly="true" SettingsBehavior-ProcessFocusedRowChangedOnServer="false" SettingsBehavior-ProcessSelectionChangedOnServer="false" OnCustomColumnDisplayText="grid_GridView1_CustomColumnDisplayText" OnSelectionChanged="Bootstrap_end_adding_SelectionChanged">
                <Settings ShowFilterRow="true" />
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True"></SettingsBehavior>
                <SettingsDataSecurity AllowDelete="true" AllowInsert="False" AllowEdit="False" />
                <Columns>
                    <dx:BootstrapGridViewTextColumn FieldName="NUM" Caption="مسلسل" VisibleIndex="0"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_ID_FK" Caption="امر التوريد" Visible="true" VisibleIndex="1"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="full_Name" Caption="اسم المورد" Visible="true" VisibleIndex="2"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Itemcode" Caption="كود الصنف" Visible="true" VisibleIndex="3"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="arabic_name" Caption="مسمى الصنف" Visible="true" VisibleIndex="4"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Store_id" Caption="المخزن الافتراضى" Visible="true" VisibleIndex="5"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Amount" Caption="الكمية" VisibleIndex="6"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Done_Amount" Caption="الكمية المستلم" VisibleIndex="7"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Remain_Amount" Caption="الكمية المتبقية" VisibleIndex="8"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="PO_DemandAmount" Caption="كمية امر الشراء" Visible="false" VisibleIndex="9"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Price_unit" Caption="سعر الوحدة" VisibleIndex="10"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Total_Price" Caption="اجمالى السعر" VisibleIndex="11"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Discount" Caption="الخصم" VisibleIndex="12"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Grand_Total" Caption="صافى السعر" VisibleIndex="13"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="description" Caption="وحدة الشراء" VisibleIndex="14"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_deliver_unit" Caption="وحدة الاستلام" VisibleIndex="15"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewDateColumn FieldName="Expiration_date" Caption="تاريخ الصلاحية" VisibleIndex="16"></dx:BootstrapGridViewDateColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Purchase_Id_unit" Caption="رقم وحدة الشراء" Visible="false" VisibleIndex="17"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_id_unit" Caption="رقم وحدة الاستلام" Visible="false" VisibleIndex="18"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="doc_id" Caption="رقم المستند" Visible="false" VisibleIndex="20"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="batch_no" Caption="رقم المستند" Visible="false" VisibleIndex="21"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="inv_num" Caption="رقم الفاتورة" Visible="false" VisibleIndex="23"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="fk_check" Caption="رقم اللجنة" Visible="false" VisibleIndex="24"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="passage_id" Caption="الممر" Visible="true" VisibleIndex="25"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="shelf_id" Caption="الرف" Visible="true" VisibleIndex="26"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_Id_unit" Caption="وحدة التخزين" Visible="false" VisibleIndex="27"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_storage_unit" Caption="وحدة التخزين" Visible="true" VisibleIndex="28"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="uom_Exchange_unit" Caption="وحدة الصرف" Visible="true" VisibleIndex="29"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="Exchange_id_unit" Caption="وحدة الصرف" Visible="false" VisibleIndex="30"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="delivery_q" Caption="الكمية بوحدة الاستلام" Visible="true" VisibleIndex="31"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="storage_q" Caption="الكمية بوحدة التخزين" Visible="true" VisibleIndex="32"></dx:BootstrapGridViewTextColumn>
                    <dx:BootstrapGridViewTextColumn FieldName="exchange_q" Caption="الكمية بوحدة الاستخدام" Visible="true" VisibleIndex="33"></dx:BootstrapGridViewTextColumn>
                </Columns>
                <Settings VerticalScrollableHeight="350" />
                <SettingsPager PageSize="50">
                    <PageSizeItemSettings Visible="true" ShowAllItem="true" />
                </SettingsPager>
                <Settings ShowFilterRow="True" ShowGroupPanel="true"></Settings>
                <SettingsBehavior ProcessFocusedRowChangedOnServer="True" ProcessSelectionChangedOnServer="true"></SettingsBehavior>
                <SettingsPager Mode="ShowPager" PageSize="8"></SettingsPager>
            </dx:BootstrapGridView>
        </dx:ContentControl>
    </ContentCollection>
</dx:BootstrapLayoutItem>
```

## Data Flow Architecture

### Query String Parameters

The system uses control parameters for comprehensive data filtering:

**Document and Store Parameters**:
- `@doc` - Document ID for filtering addition requests
- `@store` - Store ID for filtering by destination store
- `@emp_id` - Employee ID for store permissions

### Data Retrieval Process

1. **Page Load**: Sets up user context and loads default data
2. **Department Auto-population**: Retrieves department from user's employee record
3. **Store Loading**: Loads stores with user permissions
4. **Document Loading**: Loads documents with specific status conditions
5. **Data Retrieval**: Retrieves addition requests based on document and store selection
6. **Grid Binding**: Binds data to grids with comprehensive addition request information
7. **Approval Operations**: Processes approval/rejection with status updates, stock updates, and financial integration
8. **Accounting Integration**: Generates automated accounting entries for approved additions

## Key Methods

### Page_Load Method

```csharp
protected void Page_Load(object sender, EventArgs e)
```

**Purpose**: Initializes page controls and loads default data

**Process**:
1. Sets up user context from authentication cookies
2. Auto-populates department and employee information
3. Sets default date to current date
4. Binds data sources and grids
5. Sets up store permissions

### getcode Method

```csharp
public void getcode()
```

**Purpose**: Generates unique document ID for addition approval

**Process**:
1. Retrieves maximum document ID for store and move type
2. Increments to generate new unique document ID
3. Sets document ID for approval process

### Adding_Click Method

```csharp
protected void Adding_Click(object sender, EventArgs e)
```

**Purpose**: Approves selected addition requests with comprehensive financial integration

**Process**:
1. Validates document number, store selection, and row selection
2. Generates unique document ID for addition
3. Inserts stock records with comprehensive unit conversion
4. Updates addition status to approved with user and timestamp
5. Generates automated accounting entries
6. Creates supplier invoices and payment schedules
7. Handles late fee notifications and purchase account notifications
8. Provides user feedback for successful approval
9. Refreshes grids and clears selections

### reject_Click Method

```csharp
protected void reject_Click(object sender, EventArgs e)
```

**Purpose**: Rejects selected addition requests

**Process**:
1. Validates document number and row selection
2. Updates addition status to rejected with user, timestamp, and reason
3. Updates PO order quantities to restore original amounts
4. Provides user feedback for successful rejection
5. Refreshes grids and clears selections

### grid_GridView1_SelectionChanged Method

```csharp
protected void grid_GridView1_SelectionChanged(object sender, EventArgs e)
```

**Purpose**: Handles addition request selection from grid

**Process**:
1. Retrieves selected item information
2. Populates hidden fields with item data
3. Enables appropriate buttons for operations

### addDF_Movetype Method

```csharp
public void addDF_Movetype(string item_code_Df, string store_id, string ID_Avg, string price)
```

**Purpose**: Handles price difference adjustments for inventory valuation

**Process**:
1. Generates document IDs for move types 21 and 22
2. Creates adjustment records for price differences
3. Updates inventory with corrected pricing
4. Maintains audit trail for price adjustments

## Database Integration

### Inventories_Examination_receipt Table

**Purpose**: Addition request master data with approval workflow status
**Key Fields**: ID, PO_ID_FK, Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit, delivery_id_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id, inv_num, passage_id, shelf_id, storage_Id_unit, Exchange_id_unit, Adding_indator, Adding_rev_indator, Adding_approve_indator, Adding_approve_user, Adding_approve_date, Adding_approve_reject_r
**Integration**: Links to purchase orders, suppliers, and inventory stock
**Usage**: Main data source for addition request approval

### Inventories_Item_Settings Table

**Purpose**: Item master data with Arabic names and financial account mapping
**Key Fields**: item_code, arabic_name, Acc_Rev_id
**Integration**: Links items to financial accounts
**Usage**: Provides item information and financial account mapping

### Inventories_wharehouse_store Table

**Purpose**: Warehouse store master data with financial account mapping
**Key Fields**: id, english_name, arabic_name, Account_Number
**Integration**: Links stores to financial accounts
**Usage**: Provides store information and financial account mapping

### Inventories_UOM Table

**Purpose**: Unit of measure master data
**Key Fields**: id, description
**Integration**: Links to item units for display
**Usage**: Provides unit descriptions for display

### Inventories_UOM_item_unit Table

**Purpose**: Item unit conversion factors
**Key Fields**: unit_id, item_code, unit_type_id, Quantity
**Integration**: Links units to items with conversion factors
**Usage**: Provides unit conversion calculations for different unit types

### Purchese_PO_Order_Header Table

**Purpose**: Purchase order header master data with supplier information
**Key Fields**: id, Sup_Code_fk, Payment_Method_Fk, Curency_Code, Currency_value, Currency_value_date, cost_discount_value
**Integration**: Links purchase orders to suppliers and financial data
**Usage**: Provides supplier information and financial terms

### purches_Supplier_record Table

**Purpose**: Supplier master data with Arabic names
**Key Fields**: Supplier_code, Arabic_name
**Integration**: Links suppliers to purchase orders
**Usage**: Provides supplier information for display

### purches_Financial Table

**Purpose**: Supplier financial account mapping
**Key Fields**: fk_header, Fk_Supplier_Account
**Integration**: Links suppliers to financial accounts
**Usage**: Provides supplier financial account information

### ACP_Invoice_HD Table

**Purpose**: Supplier invoice header master data
**Key Fields**: id, SuppFK, Inv_Supp, Inv_DateCreate, PO_Num, Add_Doc, StoreId, Inv_Value, Discount_PO, TaxesValue_PO, AddDiscountTax_PO, PO_FinanceFK
**Integration**: Links to supplier invoices and financial processing
**Usage**: Manages supplier invoice creation and tracking

### ACP_Invoice_DTL Table

**Purpose**: Supplier invoice detail master data
**Key Fields**: Header_FK, Batch, Inv_Date, Deserved_Date, Currency, Transfer_Factor, Transfer_Date, Inv_Value, Deserved_Value, PO_Num
**Integration**: Links to invoice headers and payment schedules
**Usage**: Manages invoice payment schedules and tracking

### JEHead Table

**Purpose**: Journal entry header master data
**Key Fields**: id, AccountQCode, AccountCreateDate, AccountQdate, AccountQDescriptionArabic, AccountQDescriptionEnglish, NoOfDan, NoOfMadan, SumofDan, SumOfMadan, SubofPrice, indicator, CreateUser, OpMachine, DiariesType, compid, Limitation_Source_Code, Reference
**Integration**: Links to financial accounting system
**Usage**: Manages automated journal entry generation

### JEDetails Table

**Purpose**: Journal entry detail master data
**Key Fields**: AccountNumber, AccountName, AccountDecsription_Ar, AccountDecsription_En, AccountDate, Createuser, compid, Fk_AccountQCode, CostCenter, CostCentername, Debit, Credit
**Integration**: Links to journal entry headers
**Usage**: Manages detailed journal entry information

### Acp_Create_notification_Header Table

**Purpose**: Notification header master data for late fees and purchase accounts
**Key Fields**: Header_Notification_ID, Notice_creditor, Notice_debit, Supplier_Code_Fk, Notification_code_Fk, Notification_value, Description_notice, ind_save, op_user, date_notification, operation, Add_Doc_hd, store_id_hd, late_percent_hd, num_Delay_days_hd, diff_stock
**Integration**: Links to notification system
**Usage**: Manages automated notifications for late fees and purchase accounts

### Acp_Create_notification_details Table

**Purpose**: Notification detail master data
**Key Fields**: number_invoice, number_invoice_Dtl, tabularID, number_invoice_sup_code, value_invoice, discount, taxes, AddDiscountTax_PO, Prev_notice, Payer, Notice_dist_value, ind_status, fk_header_notice, id_source, LastModifiedDate_not, Dues, total_value_before
**Integration**: Links to notification headers
**Usage**: Manages detailed notification information

## Client-Side JavaScript

### Button Disabling

```javascript
function DisableButton3(buttonnameobject, buttonnamestring) {
    window.setTimeout(buttonnamestring + ".SetEnabled(false)", 0);
    var x = buttonnameobject;
    x.SetText("Please wait...");
}
```

**Purpose**: Disables buttons during operations to prevent multiple submissions

### Single Selection

```javascript
function CheckOne(obj) {
    var grid = obj.parentNode.parentNode.parentNode;
    var inputs = grid.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (obj.checked && inputs[i] != obj && inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}
```

**Purpose**: Ensures only one item can be selected at a time

### Back Button Prevention

```javascript
function noBack() { window.history.forward(); }
noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack(); }
window.onunload = function () { void (0); }
```

**Purpose**: Prevents users from using browser back button

## Page Structure and Components

### Master Page Integration
- **MasterPageFile**: `~/MasterPage/MainMaster.Master`
- **Bootstrap Framework**: DevExpress Web.Bootstrap v18.2
- **Form Layout**: BootstrapFormLayout with RTL (right-to-left) direction
- **Language**: Arabic interface with RTL layout

### Key Sections and Functionality

#### **1. Header Information Section**
```html
<!-- Department and Employee -->
<dx:BootstrapLayoutItem Caption="الادارة" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="المسؤل" ColSpanMd="2">
```

#### **2. Document and Store Information Section**
```html
<!-- Document and Store Information -->
<dx:BootstrapLayoutItem Caption="تاريخ الطلب" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="رقم المستند" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="المخزن" ColSpanMd="2">
<dx:BootstrapLayoutItem Caption="بحث" ColSpanMd="2">
```

#### **3. Addition Request Grid Section**
```html
<!-- Addition Request Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

#### **4. Approval Operations Section**
```html
<!-- Approval Operations -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="2" BeginRow="true">
<dx:BootstrapLayoutItem Caption="سبب الرفض" ColSpanMd="4">
<dx:BootstrapLayoutItem Caption="." ColSpanMd="2">
```

#### **5. Approved Addition Requests Grid Section**
```html
<!-- Approved Addition Requests Grid -->
<dx:BootstrapLayoutItem ShowCaption="False" ColSpanMd="12">
```

### Data Sources and Connectivity

#### **Department Data Source**
```csharp
SqlDataSource DepDS = new SqlDataSource();
DepDS.ConnectionString = ConfigurationManager.ConnectionStrings["BackOffice_CS"].ConnectionString;
DepDS.SelectCommand = "SELECT DepID,Dep_Name FROM DefinitionDep";
```

#### **Employee Data Source**
```csharp
SqlDataSource Emp = new SqlDataSource();
Emp.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
Emp.SelectCommand = "select User_Name,Emp_Code from Users where Active=1 and Emp_Code not in ('0','00')";
```

#### **Document Data Source**
```csharp
SqlDataSource doc_data_sorce = new SqlDataSource();
doc_data_sorce.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
doc_data_sorce.SelectCommand = "select distinct Inventories_Examination_receipt.doc_id from Inventories_Examination_receipt where Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='1' and Adding_approve_indator='0'";
```

#### **Store Data Source**
```csharp
SqlDataSource StoresPerDS = new SqlDataSource();
StoresPerDS.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
StoresPerDS.SelectCommand = "SELECT Inventories_rules_stores.id, WS.id as code, english_name, arabic_name, Store_type FROM Inventories_wharehouse_store WS inner join Inventories_rules_stores on store_id = WS.id WHERE Inventories_rules_stores.active = 1 and (WS.active = 1) and Inventories_rules_stores.store_id in (select Inventories_Examination_receipt.Store_id from Inventories_Examination_receipt where Inventories_Examination_receipt.doc_id=@doc_id) and emp_id = @emp";
```

#### **Addition Request Data Source**
```csharp
SqlDataSource SqlDataSource7 = new SqlDataSource();
SqlDataSource7.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource7.SelectCommand = "SELECT distinct Inventories_Examination_receipt.ID,null as NUM ,ss.arabic_name,Purchese_PO_Order_Header.Sup_Code_fk,PO_ID_FK,purches_Supplier_record.Arabic_name as full_Name, Itemcode,Store_id, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id,inv_num,passage_id,shelf_id,storage_Id_unit,Exchange_id_unit,uom1.description as uom_storage_unit,uom2.description as uom_Exchange_unit, Inventories_UOM_item_unit.Quantity*uom_unit1.Quantity*Done_Amount as delivery_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * Done_Amount as storage_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * uom_unit3.Quantity * Done_Amount as exchange_q FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id = Inventories_Examination_receipt.delivery_id_unit left join Inventories_UOM_item_unit on Inventories_UOM_item_unit.unit_id = Inventories_UOM.id and Itemcode = Inventories_UOM_item_unit.item_code and unit_type_id = 2 left join Inventories_UOM as uom on uom.id = Inventories_Examination_receipt.Purchase_Id_unit left join Inventories_UOM_item_unit as uom_unit1 on uom_unit1.unit_id = uom.id and Itemcode = uom_unit1.item_code and uom_unit1.unit_type_id = 1 left join Inventories_UOM as uom1 on uom1.id = Inventories_Examination_receipt.storage_Id_unit left join Inventories_UOM_item_unit as uom_unit2 on uom_unit2.unit_id = uom1.id and Itemcode = uom_unit2.item_code and uom_unit2.unit_type_id = 3 left join Inventories_UOM as uom2 on uom2.id = Inventories_Examination_receipt.Exchange_id_unit left join Inventories_UOM_item_unit as uom_unit3 on uom_unit3.unit_id = uom2.id and Itemcode = uom_unit3.item_code and uom_unit3.unit_type_id = 4 inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='1' and Adding_approve_indator='0' and Store_id=@store and (select emp_id from Inventories_rules_movement where emp_id=@emp_id and Movement_id='1' )=@emp_id";
```

#### **Approved Addition Requests Data Source**
```csharp
SqlDataSource SqlDataSource1 = new SqlDataSource();
SqlDataSource1.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
SqlDataSource1.SelectCommand = "SELECT distinct Inventories_Examination_receipt.ID,null as NUM ,ss.arabic_name,PO_ID_FK,purches_Supplier_record.Arabic_name as full_Name , Itemcode, Amount, Done_Amount, Remain_Amount, PO_DemandAmount, Price_unit, Total_Price, Discount, Grand_Total, Store_id, Purchase_Id_unit,Inventories_UOM.description, delivery_id_unit,uom.description as uom_deliver_unit, Expiration_date, batch_no, indicator, Emp_code, date_time, fk_check, Examination_done, receipt_done, doc_id,inv_num,passage_id,shelf_id,storage_Id_unit,Exchange_id_unit,uom1.description as uom_storage_unit,uom2.description as uom_Exchange_unit, Inventories_UOM_item_unit.Quantity*uom_unit1.Quantity*Done_Amount as delivery_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * Done_Amount as storage_q, Inventories_UOM_item_unit.Quantity * uom_unit1.Quantity * uom_unit2.Quantity * uom_unit3.Quantity * Done_Amount as exchange_q FROM Inventories_Examination_receipt inner join Inventories_UOM on Inventories_UOM.id = Inventories_Examination_receipt.delivery_id_unit left join Inventories_UOM_item_unit on Inventories_UOM_item_unit.unit_id = Inventories_UOM.id and Itemcode = Inventories_UOM_item_unit.item_code and unit_type_id = 2 inner join Inventories_UOM as uom on uom.id = Inventories_Examination_receipt.Purchase_Id_unit left join Inventories_UOM_item_unit as uom_unit1 on uom_unit1.unit_id = uom.id and Itemcode = uom_unit1.item_code and uom_unit1.unit_type_id = 1 inner join Inventories_UOM as uom1 on uom1.id = Inventories_Examination_receipt.storage_Id_unit left join Inventories_UOM_item_unit as uom_unit2 on uom_unit2.unit_id = uom1.id and Itemcode = uom_unit2.item_code and uom_unit2.unit_type_id = 3 inner join Inventories_UOM as uom2 on uom2.id = Inventories_Examination_receipt.Exchange_id_unit left join Inventories_UOM_item_unit as uom_unit3 on uom_unit3.unit_id = uom2.id and Itemcode = uom_unit3.item_code and uom_unit3.unit_type_id = 4 inner join Purchese_PO_Order_Header on Purchese_PO_Order_Header.id=Inventories_Examination_receipt.PO_ID_FK inner join purches_Supplier_record on purches_Supplier_record.Supplier_code=Purchese_PO_Order_Header.Sup_Code_fk inner join Inventories_Item_Settings ss on ss.item_code=Inventories_Examination_receipt.Itemcode where doc_id=@doc and Examination_done='1' and receipt_done='1' and Adding_indator='1' and Adding_rev_indator='1' and Adding_approve_indator='1'";
```

#### **Rejection Reasons Data Source**
```csharp
SqlDataSource dsReasons = new SqlDataSource();
dsReasons.ConnectionString = ConfigurationManager.ConnectionStrings["frontofficeConnectionString"].ConnectionString;
dsReasons.SelectCommand = "select id, reason from Inventories_Reasons where active=1 and type=19";
```

## Business Logic and Validation

### Document and Store Selection Validation

```csharp
protected void search_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند ');", true);
        return;
    }
    else if (inv_to.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن ');", true);
        return;
    }
    else
    {
        // ... search logic
    }
}
```

**Purpose**: Validates document number and store selection before data retrieval
**Process**: Ensures document number and store are selected before searching

### Row Selection Validation

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    if (txt_doc_no.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء ادخال رقم المستند ');", true);
        return;
    }
    else if (inv_to.Text == "")
    {
        ScriptManager.RegisterStartupScript(this, GetType(), "Notice", "alert('الرجاء اختيار المخزن ');", true);
        return;
    }
    else
    {
        // Row selection validation
        if (grid_GridView1.VisibleRowCount <= 0)
        {
            ScriptManager.RegisterStartupScript(this, GetType(), "Error Messsage", "alert('Please Select document');", true);
            return;
        }
        // ... approval logic
    }
}
```

**Purpose**: Validates document number, store selection, and row selection before approval operations
**Process**: Ensures all required fields are selected before approval

### Addition Approval Logic

```csharp
protected void Adding_Click(object sender, EventArgs e)
{
    HttpCookie userinfo = Request.Cookies["user"];
    user = userinfo["code"].ToString();

    // Document and store validation
    // Row selection validation
    // Document ID generation
    // Stock record insertion with unit conversion
    // Status update with user and timestamp
    // Automated accounting entry generation
    // Supplier invoice creation
    // Payment schedule generation
    // Late fee and purchase account notifications
    // Price difference adjustments

    // Success feedback and grid refresh
}
```

**Purpose**: Processes addition approval with comprehensive financial integration
**Process**: Handles approval workflow with stock updates, accounting entries, and financial processing

### Addition Rejection Logic

```csharp
protected void reject_Click(object sender, EventArgs e)
{
    HttpCookie userinfo = Request.Cookies["user"];
    user = userinfo["code"].ToString();

    // Document validation
    // Row selection validation
    // Status update with rejection reason
    // PO quantity restoration

    // ... success feedback and grid refresh
}
```

**Purpose**: Updates addition status to rejected with user, timestamp, and reason
**Process**: Processes rejection workflow with proper status updates and PO adjustments

### Financial Integration Logic

```csharp
// Automated accounting entry generation
cn.cmd.CommandText = @"insert into [Orman].[dbo].[JEHead] (AccountQCode, AccountCreateDate,AccountQdate, AccountQDescriptionArabic,AccountQDescriptionEnglish,NoOfDan, NoOfMadan, SumofDan, SumOfMadan, SubofPrice, indicator, CreateUser, OpMachine, DiariesType,compid,Limitation_Source_Code,Reference,SumofDanForign,SumOfMadanForign) OUTPUT INSERTED.id values (@AccountQCode, @AccountQdate,@AccountQdate2,@AccountQDescriptionArabic,@AccountQDescriptionEnglish, @NoOfDan, @NoOfMadan, @SumofDan, @SumOfMadan, @SubofPrice, @indicator, @CreateUser, @OpMachine, @DiariesType,@compid,@Limitation_Source_Code,@Reference,@SumofDanForign,@SumOfMadanForign)";

// Journal entry details
cn.cmd.CommandText = @"insert into [Orman].[dbo].[JEDetails] (AccountNumber, AccountName, AccountDecsription_Ar, AccountDecsription_En, AccountDate, Createuser, compid, Fk_AccountQCode, CostCenter, CostCentername,Debit,Credit) values (@AccountNumber, @AccountName, @AccountDecsription_Ar, @AccountDecsription_En, @AccountDate, @Createuser, @compid, @Fk_AccountQCode,@CostCenter,@CostCentername,@Debit,@Credit)";
```

**Purpose**: Generates automated accounting entries for approved additions
**Process**: Creates journal entries with proper account mapping and cost center allocation

### Supplier Invoice Logic

```csharp
// Supplier invoice creation
cn.cmd.CommandText = $"insert into ACP_Invoice_HD (SuppFK,Inv_Supp,Inv_DateCreate,PO_Num,Add_Doc,StoreId,Inv_Value,Discount_PO,TaxesValue_PO,AddDiscountTax_PO,PO_FinanceFK) OUTPUT INSERTED.id Values ({Session["Supp"]},(select distinct top 1 er.inv_num from Inventories_Examination_receipt er inner join Purchese_PO_Order_Header ph on ph.ID=er.PO_ID_FK where ph.Sup_Code_fk={Session["Supp"]} and er.Adding_approve_indator=1 and er.PO_ID_FK={PoNumber} and doc_id={itemDocId}),'{DateTime.Now.Date.ToString("yyyy-MM-dd")}',{PoNumber}, {txt_doc_GENERATER.Text},{inv_to.Value},{InvValue},{DiscountValue},{TaxValue},{AddDiscountTax},{FinanceFK})";

// Payment schedule generation
cn.cmd.CommandText = $"insert into ACP_Invoice_DTL (Header_FK,Batch,Inv_Date,Deserved_Date,Currency,Transfer_Factor,Transfer_Date,Inv_Value, Deserved_Value,PO_Num)select distinct {id},{item[1]},(select distinct st.StockDate from Inventories_Stock st where st.doc_id={txt_doc_GENERATER.Text} and st.MoveType=1 and st.storeid={inv_to.Value}), DATEADD(DAY, {item[0]},'{DateTime.Now.Date.ToString("yyyy-MM-dd")}'),pc.id as CurrencyID,ph.Currency_value,ph.Currency_value_date,(select NetInvValue from ACP_Invoice_HD where id={id} and active=1)*({item[2]}/100.00) as InvoiceValue,NULL,er.PO_ID_FK from Inventories_Examination_receipt er inner join Purchese_PO_Order_Header ph on ph.ID=er.PO_ID_FK inner join Purchese_PO_Order_Details pd on pd.PO_ID_FK=ph.ID and pd.Bonus=0 and er.Itemcode=pd.itemcode left join Purchese_Currencies pc on pc.id=ph.Curency_Code where ph.Sup_Code_fk={Session["Supp"]} and er.Adding_approve_indator=1 and er.PO_ID_FK={PoNumber} group by er.inv_num,er.receipt_date,pc.id,ph.Currency_value,ph.Currency_value_date,ph.Commercial_Discount,ph.Value_Tax,er.PO_ID_FK";
```

**Purpose**: Creates supplier invoices and payment schedules for approved additions
**Process**: Generates invoice headers and detailed payment schedules based on payment terms

## Error Handling and User Feedback

### Client-Side Validation

#### **Required Field Validation**
- **Document Number Validation**: Must select document number before searching
- **Store Selection Validation**: Must select store before approval operations
- **Row Selection Validation**: Must select rows before approval/rejection operations
- **Rejection Reason Validation**: Must select rejection reason before rejection

#### **User Feedback**
- **Arabic Error Messages**: Clear, localized error messages for common validation failures
- **Real-time Validation**: Immediate feedback when invalid data is entered
- **Processing Feedback**: Button text changes during operations
- **Success Indicators**: Grid updates and data display confirm successful operations

### Server-Side Validation

#### **Business Rule Validation**
- **Document Status Validation**: Ensures documents have proper status conditions for approval
- **Store Permission Validation**: Ensures user has permissions for selected store
- **Row Selection Validation**: Ensures appropriate rows are selected for operations
- **Financial Integration Validation**: Ensures financial accounts are properly configured
- **Data Integrity Validation**: Ensures referential integrity

#### **Permission Validation**
- **User Authentication**: Validates user is logged in with valid authentication cookies
- **Department Access**: Ensures user has access to their department
- **Store Access**: Ensures user has permissions for selected stores
- **Approval Access**: Ensures user has permission to approve addition requests
- **Rejection Access**: Ensures user has permission to reject addition requests

#### **Exception Handling**
- **Database Connection**: Handles database connection failures gracefully
- **Data Retrieval**: Manages data retrieval errors with appropriate user feedback
- **Approval Operations**: Handles approval/rejection failures with clear error messages
- **Financial Integration**: Handles accounting entry failures gracefully
- **Supplier Invoice Processing**: Handles invoice creation failures gracefully
- **General Exceptions**: Catches and logs unexpected errors

### Success Indicators

#### **Toastr Notifications**
- **Search Success**: Grid updates with filtered data after successful search
- **Approval Success**: Clear confirmation message for successful approvals
- **Rejection Success**: Clear confirmation message for successful rejections
- **Financial Integration Success**: Accounting entry generation confirmation
- **Supplier Invoice Success**: Invoice creation and payment schedule confirmation

#### **Visual Feedback**
- **Grid Updates**: Immediate grid refresh after successful operations
- **Button States**: Button text and appearance changes during operations
- **Selection Clearing**: Selection states clear after operations
- **Data Display**: Updated data displays confirm successful operations

## Integration Points

### Database Integration

#### **Addition Management System**
- **Addition Request Integration**: Links to addition request master data with approval workflow
- **Addition Details Integration**: Links to addition details with item and quantity information
- **Addition Status Integration**: Tracks addition status and approval workflow
- **Addition History Integration**: Provides comprehensive addition history with filtering

#### **Inventory Management System**
- **Item Master Integration**: Links to item master data with unit and supplier information
- **Stock Integration**: Links to inventory stock with quantity tracking and unit conversion
- **Store Integration**: Links to warehouse stores with account mapping
- **Unit Conversion Integration**: Links to unit of measure with conversion factors

#### **Supplier Management System**
- **Supplier Integration**: Links to supplier master data with Arabic names
- **Invoice Integration**: Links to supplier invoices with number tracking
- **Financial Account Integration**: Links suppliers to financial accounts
- **Payment Terms Integration**: Links to payment terms and schedules

#### **Purchase Order System**
- **PO Header Integration**: Links to purchase order headers with supplier information
- **PO Details Integration**: Links to purchase order details with item and quantity information
- **PO Status Integration**: Links to PO status with quantity tracking
- **PO History Integration**: Provides comprehensive PO history with filtering

#### **Financial Management System**
- **Accounting Integration**: Links to general ledger with automated journal entry generation
- **Cost Center Integration**: Links to cost centers with allocation rules
- **Account Mapping Integration**: Links items and stores to financial accounts
- **Invoice Processing Integration**: Links to accounts payable with payment schedules

### External Systems

#### **Accounting System Integration**
- **Database Tables**: JEHead, JEDetails tables
- **Integration Details**: Generates automated journal entries for approved additions
- **Data Flow**: Addition approval → Journal entry generation → Account posting

#### **Supplier Invoice System Integration**
- **Database Tables**: ACP_Invoice_HD, ACP_Invoice_DTL tables
- **Integration Details**: Creates supplier invoices and payment schedules
- **Data Flow**: Addition approval → Invoice creation → Payment schedule generation

#### **Notification System Integration**
- **Database Tables**: Acp_Create_notification_Header, Acp_Create_notification_details tables
- **Integration Details**: Generates notifications for late fees and purchase accounts
- **Data Flow**: Addition approval → Notification generation → Distribution

#### **Price Adjustment System Integration**
- **Database Tables**: Inventories_Stock with MoveType 21 and 22
- **Integration Details**: Handles price difference adjustments for inventory valuation
- **Data Flow**: Price difference detection → Adjustment records → Inventory update

## Troubleshooting Guide

### Common Issues and Solutions

#### **Document Selection Issues**
- **Issue**: Document dropdown appears empty
- **Cause**: No documents with proper status conditions exist
- **Solution**: Ensure documents have Examination_done='1', receipt_done='1', Adding_indator='1', Adding_rev_indator='1', Adding_approve_indator='0'

#### **Store Selection Issues**
- **Issue**: Store dropdown appears empty
- **Cause**: User lacks permissions for stores or stores not configured
- **Solution**: Verify user has store permissions and stores are properly configured

#### **Approval Operation Issues**
- **Issue**: Approval operations fail with validation errors
- **Cause**: Missing document selection, store selection, or row selection
- **Solution**: Ensure all required fields are selected before approval operations

#### **Financial Integration Issues**
- **Issue**: Accounting entries not generated
- **Cause**: Financial accounts not properly configured or permissions issues
- **Solution**: Verify financial account mapping and user permissions

#### **Supplier Invoice Issues**
- **Issue**: Supplier invoices not created
- **Cause**: Supplier financial data not configured or invoice numbering issues
- **Solution**: Verify supplier financial configuration and invoice numbering

#### **Permission Issues**
- **Issue**: User cannot access addition approval page
- **Cause**: User lacks proper permissions or authentication
- **Solution**: Verify user has proper authentication and department/store permissions

### System Requirements

#### **Permissions**
- **User Authentication**: Valid authentication cookies required
- **Department Access**: User must have department assignment
- **Store Access**: User must have permissions for selected stores
- **Approval Access**: User must have permission to approve addition requests
- **Rejection Access**: User must have permission to reject addition requests
- **Financial Access**: User must have permissions for financial integration

#### **Data Requirements**
- **Document Status**: Documents must have proper approval workflow status
- **Store Configuration**: Stores must be configured with financial account mapping
- **Financial Integration**: Financial accounts must be properly configured
- **Supplier Configuration**: Suppliers must be configured with financial data
- **Rejection Reasons**: Rejection reasons must be configured and active

## Usage Examples

### Addition Request Approval Workflow

1. **Page Access**: Navigate to adding_Stock_approve.aspx
2. **Document Selection**: Select document number from dropdown
3. **Store Selection**: Select destination store from dropdown
4. **Search Operation**: Click "بحث" (Search) button to load addition requests
5. **Request Review**: Review addition requests in grid with all details
6. **Row Selection**: Select specific addition requests for approval
7. **Approval Operation**: Click "اعتماد الاضافة" (Approve Addition) button
8. **Status Update**: Addition status updates to approved with user and timestamp
9. **Stock Update**: Inventory stock records created with unit conversion
10. **Financial Integration**: Automated accounting entries generated
11. **Supplier Invoice**: Supplier invoice and payment schedule created
12. **Notifications**: Late fee and purchase account notifications generated
13. **Confirmation**: Grid refreshes with updated status

### Addition Request Rejection Workflow

1. **Page Access**: Navigate to adding_Stock_approve.aspx
2. **Document Selection**: Select document number from dropdown
3. **Store Selection**: Select destination store from dropdown
4. **Search Operation**: Click "بحث" (Search) button to load addition requests
5. **Request Review**: Review addition requests in grid with all details
6. **Row Selection**: Select specific addition requests for rejection
7. **Rejection Reason**: Select rejection reason from dropdown
8. **Rejection Operation**: Click "رفض الاضافة" (Reject Addition) button
9. **Status Update**: Addition status updates to rejected with user, timestamp, and reason
10. **PO Adjustment**: PO order quantities restore original amounts
11. **Confirmation**: Grid refreshes with updated status

### Financial Integration Workflow

1. **Page Access**: Navigate to adding_Stock_approve.aspx
2. **Document and Store Selection**: Select document and destination store
3. **Search Operation**: Load addition requests for approval
4. **Approval Operation**: Approve addition requests
5. **Accounting Entry Generation**: Automated journal entries created
6. **Account Mapping**: Items and stores mapped to financial accounts
7. **Cost Center Allocation**: Costs allocated to appropriate cost centers
8. **Supplier Invoice Creation**: Supplier invoices generated with payment schedules
9. **Payment Terms Processing**: Payment schedules created based on terms
10. **Notification Generation**: Late fee and purchase account notifications created
11. **Price Adjustment**: Price difference adjustments applied if needed
12. **Audit Trail**: Complete audit trail maintained for all operations